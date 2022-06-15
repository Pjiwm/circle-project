import { Schema } from "mongoose";
import { IRoom } from "../../../../libs/interfaces";
import * as getModel from "./model_cache";

const RoomSchema = new Schema<IRoom>({
  Streamer: {
    type: Schema.Types.ObjectId,
    ref: "person",
    required: [true, "Person is required"],
  },
  Title: {
    type: String,
    max: 120,
    required: [true, "Title is required"],
  },
  IsLive: {
    type: Boolean,
    required: [true, "IsLive is required"],
  },
  Viewers: {
    type: Number,
    required: [true, "viewers is required"],
  },
});

export default getModel.cacher("Room", RoomSchema);


