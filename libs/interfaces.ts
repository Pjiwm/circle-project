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
    Title: String;
    IsLive: Boolean;
    Viewers: Number;
}

interface IPerson {
    _Id: String
    Name: String;
    PublicKey: String;
    Satochie: Number;
    Followed: [IRoom];
}

export {IRoom,IChatMessage,IPerson}