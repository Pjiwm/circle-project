const logger = require("tracer").console();
const {
  getLatestDateFromDirectory,
} = require("../../../../libs/get-latest-date");

/**
 * Get the manifest of the livestream by username of the transparent person
 */
const getLivestreamManifestSignatureByUsername = (req, res) => {
  logger.log("getLivestreamManifestByUsername called...");
  res.status(500).json({ msg: "method not implemented" });

  const username = req.params.username;

  // TODO call utils/get-latest-date
  getLatestDateFromDirectory(username, (error, result) => {
    if (error) {
      res.status(404).json({ msg: "No stream found" });
    }
    if (result) {
      const latestDate = result.latestDate;
      // TODO send manifest
    }
  });
};

module.exports = { getLivestreamManifestSignatureByUsername };
