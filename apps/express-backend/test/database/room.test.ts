import {RoomModel} from "../../src/schemas/room.model";
import {Model} from "mongoose";
describe("room mongoose schema works", () => {
    test("Creates a room model", async () => {
        const room = RoomModel.create({});
    });
});

