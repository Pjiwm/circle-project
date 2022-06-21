import { Schema, model } from "mongoose";

const uuidSchema = new Schema({
  uuid: {
    type: String,
    required: [true, "uuid is required"],
    unique: true
  },
});

export const uuidModel = model("uuid", uuidSchema);