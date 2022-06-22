const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect(`${process.env.MONGO_DB_CONNECTION}/circle`, {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  });
};

module.exports = connectDB;
