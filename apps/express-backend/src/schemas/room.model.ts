import { Schema, model } from "mongoose";
import { IRoom } from "../../../../libs/interfaces";

const RoomSchema = new Schema<IRoom>({
  streamer: {
    type: Schema.Types.ObjectId,
    ref: "person",
    required: [true, "Person is required"],
  },
  title: {
    type: String,
    max: 120,
    required: [true, "Title is required"],
  },
  isLive: {
    type: Boolean,
    required: [true, "IsLive is required"],
  },
  viewers: {
    type: Number,
    required: [true, "viewers is required"],
  },
});

export const RoomModel = model<IRoom>("room", RoomSchema);
