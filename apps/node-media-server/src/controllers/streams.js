const fs = require("fs");
const logger = require("tracer").console();
const {
  getLatestDateFromOutputDirectory,
} = require("../../../../libs/get-latest-date");

/**
 * Get the manifest of the livestream by username of the transparent person
 */
const getLivestreamManifestSignatureByUsername = (req, res) => {
  logger.log("getLivestreamManifestByUsername called...");
  res.status(500).json({ msg: "method not implemented" });

  const username = req.params.username;

  // figure out the latest stream
  getLatestDateFromOutputDirectory(username, (error, result) => {
    if (error) {
      res.status(404).json({ msg: "No stream found" });
    }
    if (result) {
      const latestDate = result.latestDate;
      // get manifest from this latestDate folder
      const manifestFile = `${process.env.FFMPEG_ROOT_OUTPUT_FOLDER}/${username}-streams/${latestDate}/${username}.m3u8`;

      // watch for changes
      fs.watchFile(manifestFile, (curr, prev) => {
        if (curr) {
          // sign the file
        }
      });
    }
  });
};

module.exports = { getLivestreamManifestSignatureByUsername };
