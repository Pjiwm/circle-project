import { Document } from "mongoose";

interface IRoom extends Document {
  _Id: String;
  Streamer: IPerson;
  Title: String;
  IsLive: Boolean;
  Viewers: Number;
}

interface IChatMessage extends Document {
  _Id: String;
  Person: IPerson;
  Room: IRoom;
  Message: String;
  DateTime: Date;
  Hash: String;
}

interface IPerson extends Document {
  _Id: String;
  Name: String;
  PublicKey: String;
  Satochi: Number;
  Followed: [IRoom] | undefined;
}

export { IRoom, IChatMessage, IPerson };
