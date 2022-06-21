import { Schema, model } from "mongoose";
import * as autoPopulate from "mongoose-autopopulate";
import { IPerson } from "../../../../libs/interfaces";
import { RoomModel } from "./room.model";

const PersonSchema = new Schema<IPerson>({
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
    autopopulate: true
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
PersonSchema.plugin(require("mongoose-autopopulate"));

export const PersonModel = model<IPerson>("person", PersonSchema);
