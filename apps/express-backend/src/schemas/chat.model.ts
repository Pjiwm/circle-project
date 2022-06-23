import { Schema, model } from "mongoose";
import { IChatMessage } from "../../../../libs/interfaces";
const ChatSchema = new Schema<IChatMessage>({
  person: {
    type: Schema.Types.ObjectId,
    ref: "person",
    required: [true, "Person is required"],
    autopopulate: true
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
    type: String
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
ChatSchema.plugin(require("mongoose-autopopulate"));

export const ChatModel = model<IChatMessage>("chat", ChatSchema);
