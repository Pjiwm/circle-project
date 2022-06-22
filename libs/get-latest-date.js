const fs = require("fs");
const logger = require("tracer").console();

/**
 * get the latest date from a directory
 * @param username username of the streamer
 * @param callback (error, result), result contains the date of the latest directory and the path to this directory
 */
const getLatestDateFromOutputDirectory = (username, callback) => {
  // read directory, load timestamps into array
  const folderContainingTimestamps = `${process.env.FFMPEG_ROOT_OUTPUT_FOLDER}/${username}-streams`;
  try {
    const timestamps = fs
      .readdirSync(folderContainingTimestamps)
      .map((date) => new Date(date));

    // disgusting imperative way to check latest date
    if (timestamps.length === 0)
      return callback("No stream available", undefined);
    let latestDate = timestamps[0];
    for (let i = 1; i < timestamps.length; i++) {
      let currentDate = timestamps[i];
      if (currentDate > latestDate) {
        latestDate = currentDate;
      }
    }
    return callback(false, {
      latestDate,
      path: `${process.env.FFMPEG_ROOT_OUTPUT_FOLDER}/${username}-streams/${latestDate}`,
    });
  } catch (e) {
    console.log("Error reading file");
    return callback("No stream available", undefined);
  }
};

module.exports = {
  getLatestDateFromOutputDirectory,
};
