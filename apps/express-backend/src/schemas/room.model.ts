import { Document, Schema, model } from "mongoose"

export interface IRoom {
  Streamer: new Person;
  Title: String;
  IsLive: Boolean;
  Viewers: Number;
}

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

export const RoomModel = model<IRoom>("room", RoomSchema);

