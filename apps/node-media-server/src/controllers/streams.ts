import * as fs from "fs";
import { RsaService } from "../../../../libs/keyUtils";
import { PUBLIC_SERVER_KEY, PRIVATE_SERVER_KEY } from "../../../../libs/key";

const logger = require("tracer").console();
const {
  getLatestDateFromOutputDirectory,
} = require("../../../../libs/get-latest-date");

/**
 * Get the manifest of the livestream by username of the transparent person
 */
const getLivestreamManifestSignatureByUsername = (req, res) => {
  logger.log("getLivestreamManifestByUsername called...");

  const username = req.params.username;

  // figure out the latest stream
  getLatestDateFromOutputDirectory(username, (error, result) => {
    if (result) {
      const latestDate = result.latestDate;
      // check if user is live or not
      fs.stat(
        `${process.env.FFMPEG_ROOT_OUTPUT_FOLDER}/${username}-streams/${latestDate}/_user_is_live`,
        (error, result) => {
          if (result) {
            console.log("user is live!");

            // get manifest from this latestDate folder
            const manifestFile = `${process.env.FFMPEG_ROOT_OUTPUT_FOLDER}/${username}-streams/${latestDate}/${username}.m3u8`;
            fs.stat(manifestFile, (error, result) => {
              if (result) {
                const rsaService: RsaService = new RsaService();

                const manifestFileString = fs
                  .readFileSync(manifestFile)
                  .toString();
                const manifestFileStringSignature = rsaService.encrypt(
                  manifestFileString,
                  PRIVATE_SERVER_KEY
                );

                res
                  .status(200)
                  .json({ signature: manifestFileStringSignature });
              } else {
                console.log("manifest file not yet available");
                res.status(500).json({
                  msg: "manifest file not available yet, try again shortly",
                });
              }
            });
          } else {
            console.log("user is not live!");

            res.status(500).json({ msg: "user is not live" });
          }
        }
      );
    } else {
      console.log("folder does not exist");

      res.status(500).json({ msg: "user has never streamed before" });
    }
  });
};

module.exports = { getLivestreamManifestSignatureByUsername };
