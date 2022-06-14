import { Schema } from "mongoose";
import { IChatMessage } from "../../../../libs/interfaces";
import * as getModel from "./model_cache";
const ChatSchema = new Schema<IChatMessage>({
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

export default getModel.cacher("chat", ChatSchema);

