class Room {
  _id: String;
  streamer: Person;
  title: String;
  isLive: Boolean;
  viewers: Number;

  constructor(
    _id: String,
    streamer: Person,
    title: String,
    isLive: Boolean,
    viewers: Number
  ) {
    this._id = _id;
    this.streamer = streamer;
    this.title = title;
    this.isLive = isLive;
    this.viewers = viewers;
  }
}

class Person {
  _id: String;
  name: String;
  publicKey: String;
  satochi: Number;
  followed: [Room] | undefined;

  constructor(
    _id: String,
    name: String,
    publicKey: String,
    satochi: Number,
    followed: [Room]
  ) {
    this._id = _id;
    this.name = name;
    this.publicKey = publicKey;
    this.satochi = satochi;
    this.followed = followed;
  }
}

class ChatMessage {
  _id: String;
  person: Person;
  room: Room;
  message: String;
  dateTime: Date;
  signature: String;

  constructor(
    _id: String,
    person: Person,
    room: Room,
    message: String,
    dateTime: Date,
    signature: String
  ) {
    this._id = _id;
    this.person = person;
    this.room = room;
    this.message = message;
    this.dateTime = dateTime;
    this.signature = signature;
  }
}

export { Room, Person, ChatMessage };
