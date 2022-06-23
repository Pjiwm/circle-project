import * as fs from "fs";
import { RsaService } from "../../../../libs/keyUtils";
import { PRIVATE_SERVER_KEY } from "../../../../libs/key";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require("tracer").console();
const {
  getLatestDateFromOutputDirectory,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
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
                  .toString()
                  .replace(/\n/g, "");
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

const getStreamSegmentsSignaturesByUsername = (req, res) => {
  logger.log("getStreamSegmentsSignaturesByUsername called...");

  const username = req.params.username;
  const segment = parseInt(req.params.segment);
  // const segments = req.params.segments.split("-");
  // const startSegment = parseInt(segments[0]);
  // const endSegment = parseInt(segments[1]);
  // console.log(startSegment);
  // console.log(endSegment);

  // return signature of one segment
  getLatestDateFromOutputDirectory(username, (error, result) => {
    if (result) {
      console.log("folder exists");
      const latestDate = result.latestDate;

      const segmentFile = `${process.env.FFMPEG_ROOT_OUTPUT_FOLDER}/${username}-streams/${latestDate}/${username}${segment}.ts`;
      console.log(segmentFile);

      // check if segment exists
      fs.stat(segmentFile, (error, result) => {
        if (result) {
          console.log("segment exists");
          const rsaService: RsaService = new RsaService();

          const segmentFileString = fs
            .readFileSync(segmentFile)
            .toString()
            .replace(/\n/g, "");
          const segmentFileStringSignature = rsaService.encrypt(
            segmentFileString,
            PRIVATE_SERVER_KEY
          );

          res.status(200).json({ signature: segmentFileStringSignature });
        } else {
          res.status(500).json({ msg: "segment does not exist" });
        }
      });
    } else {
      res.status(500).json({ msg: "folder does not exist" });
    }
  });

  // if (startSegment === endSegment) {
  //   // return signature of one segment
  //   getLatestDateFromOutputDirectory(username, (error, result) => {
  //     if (result) {
  //       console.log("folder exists");
  //       const latestDate = result.latestDate;
  //
  //       const segmentFile = `${process.env.FFMPEG_ROOT_OUTPUT_FOLDER}/${username}-streams/${latestDate}/${username}${startSegment}.ts`;
  //       console.log(segmentFile);
  //
  //       // check if segment exists
  //       fs.stat(segmentFile, (error, result) => {
  //         if (result) {
  //           console.log("segment exists");
  //           const rsaService: RsaService = new RsaService();
  //
  //           const segmentFileString = fs.readFileSync(segmentFile).toString();
  //           const segmentFileStringSignature = rsaService.encrypt(
  //             segmentFileString,
  //             PRIVATE_SERVER_KEY
  //           );
  //
  //           res.status(200).json({ signature: segmentFileStringSignature });
  //         } else {
  //           res.status(500).json({ msg: "segment does not exist" });
  //         }
  //       });
  //     } else {
  //       res.status(500).json({ msg: "folder does not exist" });
  //     }
  //   });
  // }
  // else {
  //   getLatestDateFromOutputDirectory(username, (error, result) => {
  //     if (result) {
  //       console.log("folder exists");
  //       const latestDate = result.latestDate;
  //
  //       const segmentFile = `${process.env.FFMPEG_ROOT_OUTPUT_FOLDER}/${username}-streams/${latestDate}/${username}${startSegment}.ts`;
  //
  //       // create array of numbers (inclusive) starting with startSegment and ending with endSegment
  //       const range = [...Array(endSegment - startSegment + 1).keys()].map(
  //         (x) => x + startSegment
  //       );
  //
  //       const signatures;
  //       range.map((s) => fs.stat());
  //     }
  //   });
  // }
};

module.exports = {
  getLivestreamManifestSignatureByUsername,
  getStreamSegmentsSignaturesByUsername,
};
