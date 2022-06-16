import { Schema, model } from "mongoose";
import { IPerson } from "../../../../libs/interfaces";
import { RoomModel } from "./room.model";

const PersonSchema = new Schema<IPerson>({
  Name: {
    type: String,
    max: 120,
    required: [true, "Name is required"],
  },
  PublicKey: {
    type: String,
    required: [true, "PublicKey is required"],
  },
  Satochi: {
    type: Number,
    required: [true, "Satochi is required"],
  },
  Followed: {
    // TODO type werkt misschien niet, dit moet misschien later gefixt worden?
    type: [RoomModel.schema],
  },
});

export const PersonModel = model<IPerson>("person", PersonSchema);
