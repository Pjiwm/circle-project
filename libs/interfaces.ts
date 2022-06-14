interface IRoom {
    _Id: String
    Streamer: IPerson;
    Title: String;
    IsLive: Boolean;
    Viewers: Number;
}

interface IChatMessage {
    _Id: String
    Person: IPerson;
    Room: IRoom;
    Message: String;
    DateTime: Date;
    Hash: String;
}

interface IPerson {
    _Id: String
    Name: String;
    PublicKey: String;
    Satochi: Number;
    Followed: [IRoom];
}

export {IRoom,IChatMessage,IPerson}