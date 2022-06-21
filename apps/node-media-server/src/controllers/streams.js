const logger = require("tracer").console();
const {
  getLatestDateFromDirectory,
} = require("../../../../libs/get-latest-date");

/**
 * Get the manifest of the livestream by username of the transparent person
 */
const getLivestreamManifestByUsername = (req, res) => {
  logger.log("getLivestreamManifestByUsername called...");
  res.status(500).json({ msg: "method not implemented" });

  const username = req.params.username;

  // read directory, load timestamps into array
  const timestampsFolder = `${process.env.FFMPEG_ROOT_OUTPUT_FOLDER}/${username}-streams`;
  logger.log(`TIMESTAMPS FOLDER ==> ${timestampsFolder}`);
  const timestamps = fs
    .readdirSync(timestampsFolder)
    .map((date) => new Date(date));

  // disgusting imperative way to check latest date
  if (timestamps.length === 0)
    res.status(404).json({ msg: "No stream available for this user" });
  let latestDate = timestamps[0];
  for (let i = 1; i < timestamps.length; i++) {
    let currentDate = timestamps[i];
    if (currentDate < latestDate) {
      latestDate = currentDate;
    }
  }

  // TODO send manifest

  // express.static(
  //   `${process.env.FFMPEG_ROOT_OUTPUT_FOLDER}/${username}-streams/NEWEST TIMESTAMP HERE/${username}.m3u8`
  // );
};

module.exports = { getLivestreamManifestByUsername };
