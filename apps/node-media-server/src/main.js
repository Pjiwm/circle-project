// express
const express = require("express");
const app = express();
const cors = require("cors");

// routes
const streamsRouter = require("./routes/streams");

// ffmpeg
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

// misc
const logger = require("tracer").console();
const { getLatestDateFromDirectory } = require("../../../libs/get-latest-date");

// global declarations
const nmsPort = process.env.NMS_PORT;
const hlsPort = process.env.HLS_PORT;

app.use(cors());

// all requests go through here first
// disabled because it clutters the logs
// app.get("*", (req, res, next) => {
//   const reqMethod = req.method;
//   const reqUrl = req.url;
//   logger.log(`${reqMethod} request at ${reqUrl}`);
//   next();
// });

app.get("/", (req, res) => {
  res.send("You've reached the media backend");
});

// define routes
app.use("/api/v1/streams", streamsRouter);

// TODO make express able to serve archived content based on url
// TODO make /streams/${username} default to the currently available LIVEstream (if not live then get error saying person is not livestreaming)

// TODO implement https://stackoverflow.com/questions/21878178/hls-streaming-using-node-js
app.listen(hlsPort, () => {
  logger.log(`Server listening on ${hlsPort}`);
});

// overkoepelend idee voor rtmp stream bestand afhandeling
// 1. Maak de root folder voor ffmpeg input
// 2. Maak de root folder voor ffmpeg output
// 3. Maak subfolder voor de huidige user
// 4. Maak timestamp folders zodat oude streams niet overschreven worden
// 5. Output ffmpeg komt in deze folder

/**
 * create directory structure for new livestream
 * @param username username of the transparent person
 * @param callback contains the newly created directory structures
 */
const createFoldersForStreaming = (username, callback) => {
  // define root folder containing the to be transcoded files
  const ffmpegRootInputFolder = process.env.FFMPEG_ROOT_INPUT_FOLDER;

  // define root folder containing the transcoded files
  const ffmpegRootOutputFolder = process.env.FFMPEG_ROOT_OUTPUT_FOLDER;

  // define user specific paths
  const userRootInputFolder = `${ffmpegRootInputFolder}/${username}-streams`;
  const userRootOutputFolder = `${ffmpegRootOutputFolder}/${username}-streams`;

  // define timestamp folders for these paths so later stream dont overwrite older streams
  const currentTime = new Date();
  // const userRootInputTimestampsFolder = `${userRootInputFolder}/${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}_${currentTime.getHours()}-${currentTime.getMinutes()}`; // assuming the user can only start one stream per minute (might need redesigning)
  const userRootInputTimestampsFolder = `${userRootInputFolder}/${currentTime}`;

  // define folder used for input to ffmpeg based on the user
  // const userRootOutputTimestampsFolder = `${userRootOutputFolder}/${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}_${currentTime.getHours()}-${currentTime.getMinutes()}`;
  const userRootOutputTimestampsFolder = `${userRootOutputFolder}/${currentTime}`;

  // creating the folders
  if (!fs.existsSync(userRootInputTimestampsFolder)) {
    logger.log("creating", userRootInputTimestampsFolder);
    fs.mkdirSync(userRootInputTimestampsFolder, { recursive: true });
  }
  if (!fs.existsSync(userRootOutputTimestampsFolder)) {
    logger.log("creating", userRootOutputTimestampsFolder);
    fs.mkdirSync(userRootOutputTimestampsFolder, { recursive: true });
  }

  return callback({
    userRootInputTimestampsFolder,
    userRootOutputTimestampsFolder,
  });
};

/**
 * Create or delete a file in the stream output folder denoting whether the user is live.
 * A present file means live, no file means not live.
 * It will also make an API call to the follower backend to set the correct value of the boolean
 * @param outputFolder folder to place the file in
 * @param {boolean} isLive boolean whether user is live or not. true means the file will be created, false means the file will be deleted
 */
const userIsLive = (outputFolder, isLive) => {
  if (isLive === false) {
    fs.rmSync(`${outputFolder}/_user_is_live`);

    // make the api call so the other server also knows we're not live anymore
  } else {
    fs.writeFileSync(`${outputFolder}/_user_is_live`, "We'll do it live!");

    // make the api call so the other server also knows we're live
  }
};

/**
 * Converts ffmpeg input to an HLS stream
 * @param inputFolder folder containing input media for ffmpeg
 * @param outputFolder folder for ffmpeg output
 * @param username the username of the transparent person
 */
const ffmpegInputToHLS = (inputFolder, outputFolder, username) => {
  logger.log(`ffmpeg input folder: ${inputFolder}`);
  logger.log(`ffmpeg output folder: ${outputFolder}`);
  // TODO dynamic input for ffmpeg
  ffmpeg(`rtmp://localhost/live/person`, { timeout: 432000 })
    .addOptions([
      "-profile:v baseline", // baseline profile (level 3.0) for H264 video codec
      "-level 3.0",
      "-vf scale=1280:720", // convert any 16:9 dimension video to 1280x720 resolution
      "-start_number 0", // start the first .ts segment at index 0
      "-hls_time 3", // 3 second segment duration
      "-hls_list_size 0", // maximum number of playlist entries (0 means all entries/infinite)
      "-f hls", // HLS format
    ])
    .output(`${outputFolder}/${username}.m3u8`)
    .on("error", function (err, stdout, stderr) {
      logger.log("Cannot process video: " + err.message);
    })
    .on("end", function (stdout, stderr) {
      logger.log("Transcoding succeeded!");
    })
    .run();
};

/**
 * Handle stream based on username and live status
 * @param username The username of the transparent person
 * @param {boolean} isLive Whether user is live or not
 */
const handleStream = (username, isLive) => {
  if (isLive === true) {
    createFoldersForStreaming(username, (mediaFolders) => {
      ffmpegInputToHLS(
        mediaFolders.userRootInputTimestampsFolder,
        mediaFolders.userRootOutputTimestampsFolder,
        username
      );
    });
    getLatestDateFromDirectory(username, (error, result) => {
      userIsLive(result.path, true);

      // serve streams
      logger.log(`Serving: ${result.path}`);
      app.use(`/${username}-streams`, express.static(`${result.path}`));
    });
  }
  if (isLive === false) {
    getLatestDateFromDirectory(username, (error, result) => {
      userIsLive(result.path, false);
    });
  }
};

// NMS for handling incoming rtmp stream
const NodeMediaServer = require("node-media-server");

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 5000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: nmsPort,
    allow_origin: "*",
  },
};

const nms = new NodeMediaServer(config);
nms.run();

nms.on("postPublish", (id, StreamPath, args) => {
  const username = StreamPath.slice(6); // extract username from StreamPath
  handleStream(username, true); // transcode the rtmp stream to hls
});

nms.on("donePublish", (id, StreamPath, args) => {
  const username = StreamPath.slice(6); // extract username from StreamPath
  handleStream(username, false); // set streaming status to false
});
