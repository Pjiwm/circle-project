const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    max: 120,
    required: [true, "Name is required"],
    unique: true,
  },
  publicKey: {
    type: String,
    required: [true, "PublicKey is required"],
  },
  satochi: {
    type: Number,
    required: [true, "Satochi is required"],
  },
  followed: {
    type: [Schema.Types.ObjectId],
    ref: "room",
  },
});

module.exports = mongoose.model("Person", personSchema);
