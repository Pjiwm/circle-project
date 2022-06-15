import {IRoom,IChatMessage,IPerson} from "./interfaces"

class Room implements IRoom {
    _Id: String;
    Streamer: IPerson;
    Title: String;
    IsLive: Boolean;
    Viewers: Number;
}

class Person implements IPerson {
    _Id: String;
    Name: String;
    PublicKey: String;
    Satochi: Number;
    Followed: [IRoom];
}

class ChatMessage implements IChatMessage {
    _Id: String
    Person: IPerson;
    Room: IRoom;
    Message: String;
    DateTime: Date;
    Hash: String;
}

export {Room,Person,ChatMessage}