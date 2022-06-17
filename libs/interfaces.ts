import { Document } from "mongoose";

interface IRoom extends Document {
  _id: String;
  streamer: IPerson;
  title: String;
  isLive: Boolean;
  viewers: Number;
}

interface IChatMessage extends Document {
  _id: String;
  person: IPerson;
  room: IRoom;
  message: String;
  dateTime: Date;
  signature: String;
}

interface IPerson extends Document {
  _id: String;
  name: String;
  publicKey: String;
  satochi: Number;
  followed: [IRoom] | undefined;
}

export { IRoom, IChatMessage, IPerson };
