const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const roomSchema = new mongoose.Schema({
  streamer: {
    type: Schema.Types.ObjectId,
    ref: "person",
    required: [true, "person is required"],
  },
  title: {
    type: String,
    max: 120,
    required: [true, "title is required"],
  },
  isLive: {
    type: Boolean,
    required: [true, "isLive is required"],
  },
  viewers: {
    type: Number,
    required: [true, "viewers is required"],
  },
});

module.exports = mongoose.model("Room", roomSchema);
