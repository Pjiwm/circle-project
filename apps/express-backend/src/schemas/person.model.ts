import { Schema, model } from "mongoose";
import { IPerson } from "../../../../libs/interfaces";
import { RoomModel } from "./room.model";

const PersonSchema = new Schema<IPerson>({
  name: {
    type: String,
    max: 120,
    required: [true, "Name is required"],
    unique: true
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

export const PersonModel = model<IPerson>("person", PersonSchema);
