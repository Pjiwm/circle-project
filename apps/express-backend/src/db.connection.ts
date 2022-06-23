import mongoose = require("mongoose");

mongoose.Promise = global.Promise;
/**
 * Connects to MongoDB.
 * Based on the ENV it will connect to a seperate test DB or the production DB.
 * If the environment variable $MONGO_DB_CONNECTION cannot be found localhost will be used on port 27017.
 */
async function connectToMongo(): Promise<void> {
  const mongoUrl =
    process.env.MONGO_DB_CONNECTION || "mongodb://mongo_circle:27017/circle";
  console.log(mongoUrl);
  try {
    if (process.env.NODE_ENV !== "test") {
      await mongoose.connect(`${mongoUrl}`, {
        keepAlive: true,
        keepAliveInitialDelay: 300000,
      });
      console.info("Connected to Mongo DB");
    } else {
      await mongoose.connect(`${mongoUrl}/circle_test`);
      console.info("Connected to Mongo test DB");
    }
  } catch (err) {
    console.warn("Failed to connect to Mongo database, retrying in 6 seconds");
    console.error("Error: ", err);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTimeout(connectToMongo, 6000);
  }
}

export { connectToMongo };
