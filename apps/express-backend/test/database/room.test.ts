import {RoomModel} from "../../src/schemas/room.model";
describe("room mongoose schema works", () => {
    let room;
    it("Creates a room model", async () => {
        room = await new RoomModel({
            person: 1234,
            title: "Superroom",
            isLive: true,
            viewers: 100
        });
        expect((room.person = 1234));
        expect((room.title = "Superroom"));
        expect((room.isLive = true));
        expect((room.viewers = 100));
    });
});

