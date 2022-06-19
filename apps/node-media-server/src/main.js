// express
const express = require("express");
const app = express();
const cors = require("cors");

// routes
const streamsRouter = require("./routes/streams");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// ffmpeg
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

// misc
const logger = require("tracer").console();

// global declarations
const nmsPort = process.env.PORT || 8000;
const hlsPort = process.env.PORT || 8100;

app.use(cors());

// all requests go through here first
app.get("*", (req, res, next) => {
  const reqMethod = req.method;
  const reqUrl = req.url;
  logger.log(`${reqMethod} request at ${reqUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send("You've reached the media backend");
});

// define routes
app.use("/api/v1/streams", streamsRouter);

// define middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

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
  const ffmpegRootInputFolder =
    process.env.FFMPEG_ROOT_INPUT_FOLDER ||
    `/home/${process.env.USER}/Videos/ScreenRecordings`; // deze USER variabele is de linux user, niet de user van de webapp

  // define root folder containing the transcoded files
  const ffmpegRootOutputFolder =
    process.env.FFMPEG_ROOT_OUTPUT_FOLDER ||
    `/home/${process.env.USER}/Desktop`;

  // define user specific paths
  const userRootInputFolder = `${ffmpegRootInputFolder}/${username}-streams`;
  const userRootOutputFolder = `${ffmpegRootOutputFolder}/${username}-streams`;

  // define timestamp folders for these paths so later stream dont overwrite older streams
  const currentTime = new Date();
  const userRootInputTimestampsFolder = `${userRootInputFolder}/${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}_${currentTime.getHours()}-${currentTime.getMinutes()}`; // assuming the user can only start one stream per minute (might need redesigning)

  // define folder used for input to ffmpeg based on the user
  const userRootOutputTimestampsFolder = `${userRootOutputFolder}/${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}_${currentTime.getHours()}-${currentTime.getMinutes()}`;

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
 * Transcode current stream and put output in folder based on username
 * @param username The username of the transparent person
 */
const transcodeStream = (username) => {
  createFoldersForStreaming(username, (mediaFolders) => {
    ffmpegInputToHLS(
      mediaFolders.userRootInputTimestampsFolder,
      mediaFolders.userRootOutputTimestampsFolder,
      username
    );
  });
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
  logger.log(
    "[NodeEvent on postPublish]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}` // get some info about the stream
  );
  transcodeStream("sylvester"); // transcode the rtmp stream to hls
});
