const mongoose = require("mongoose");

const connectDB = () => {
  const mongoUrl =
  process.env.MONGO_DB_CONNECTION || "mongodb://mongo_circle:27017/circle";
  return mongoose.connect(`${mongoUrl}`, {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  });
};

module.exports = connectDB;
