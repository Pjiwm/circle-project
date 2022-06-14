import { IRoom, IChatMessage, IPerson } from "./interfaces";

class Room implements IRoom {
  _Id: String;
  Streamer: IPerson;
  Title: String;
  IsLive: Boolean;
  Viewers: Number;

  constructor(
    _Id: String,
    Streamer: IPerson,
    Title: String,
    IsLive: Boolean,
    Viewers: Number
  ) {
    this._Id = _Id;
    this.Streamer = Streamer;
    this.Title = Title;
    this.IsLive = IsLive;
    this.Viewers = Viewers;
  }
}

class Person implements IPerson {
  _Id: String;
  Name: String;
  PublicKey: String;
  Satochi: Number;
  Followed: [IRoom] | undefined;

  constructor(
    _Id: String,
    Name: String,
    PublicKey: String,
    Satochi: Number,
    Followed: [IRoom]
  ) {
    this._Id = _Id;
    this.Name = Name;
    this.PublicKey = PublicKey;
    this.Satochi = Satochi;
    this.Followed = Followed;
  }
}

class ChatMessage implements IChatMessage {
  _Id: String;
  Person: IPerson;
  Room: IRoom;
  Message: String;
  DateTime: Date;
  Hash: String;

  constructor(
    _Id: String,
    Person: IPerson,
    Room: IRoom,
    Message: String,
    DateTime: Date,
    Hash: String
  ) {
    this._Id = _Id;
    this.Person = Person;
    this.Room = Room;
    this.Message = Message;
    this.DateTime = DateTime;
    this.Hash = Hash;
  }
}

export { Room, Person, ChatMessage };
