import { Schema, model } from "mongoose";
import { IChatMessage } from "../../../../libs/interfaces";
const ChatSchema = new Schema<IChatMessage>({
  person: {
    type: Schema.Types.ObjectId,
    ref: "person",
    required: [true, "Person is required"],
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "room",
    required: [true, "Room is required"],
  },
  message: {
    type: String,
    max: 120,
    required: [true, "Message is required"],
  },
  dateTime: {
    type: Date,
    required: [true, "DateTime is required"],
  },
  signature: {
    type: String,
    required: [true, "Hash is required"],
  },
});

export const ChatModel = model<IChatMessage>("chat", ChatSchema);
