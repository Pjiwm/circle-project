import { Document } from "mongoose";

interface IRoom extends Document {
  _id: string;
  streamer: IPerson;
  title: string;
  isLive: Boolean;
  viewers: Number;
}

interface IChatMessage extends Document {
  _id: string;
  person: IPerson;
  room: IRoom;
  message: string;
  dateTime: Date;
  signature: string;
}

interface IPerson extends Document {
  _id: string;
  name: string;
  publicKey: string;
  satochi: Number;
  followed: [IRoom] | undefined;
}

export { IRoom, IChatMessage, IPerson };
