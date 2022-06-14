import { Document, Schema, model } from "mongoose";

const ChatSchema = new Schema({
  Person: {
    type: Schema.Types.ObjectId,
    ref: "person",
    required: [true, "Person is required"],
  },
  Room: {
    type: Schema.Types.ObjectId,
    ref: "room",
    required: [true, "Room is required"],
  },
  Message: {
    type: String,
    max: 120,
    required: [true, "Message is required"],
  },
  DateTime: {
    type: Date,
    required: [true, "DateTime is required"],
  },
  Hash: {
    type: String,
    required: [true, "Hash is required"],
  },
});

export const ChatModel = model("chat", ChatSchema);
