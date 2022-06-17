class Room {
  _id: string;
  streamer: Person;
  title: string;
  isLive: Boolean;
  viewers: Number;

  constructor(
    _id: string,
    streamer: Person,
    title: string,
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
  _id: string;
  name: string;
  publicKey: string;
  satochi: Number;
  followed: [Room] | undefined;

  constructor(
    _id: string,
    name: string,
    publicKey: string,
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
  _id: string;
  person: Person;
  room: Room;
  message: string;
  dateTime: Date;
  signature: string;

  constructor(
    _id: string,
    person: Person,
    room: Room,
    message: string,
    dateTime: Date,
    signature: string
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
