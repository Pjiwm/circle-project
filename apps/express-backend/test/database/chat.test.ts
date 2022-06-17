import {PersonModel} from "../../src/schemas/person.model";
import {ChatModel} from "../../src/schemas/chat.model";
import {Model} from "mongoose";
import { title } from "process";
describe("Chat mongoose schema works", () => {
    let chat;
    it("Creates a chat model", async () => {
        chat = await new ChatModel({
            person: 1234,
            room: 1234,
            message: "Nice stream",
            dateTime: "2000-01-01T10:10:10.100z",
            signature: "98237503257"
        });
        expect((chat.person = [1234]));
        expect((chat.room = [1234]));
        expect((chat.message = "Nice stream"));
        expect((chat.dateTime = "2000-01-01T10:10:10.100z"));
        expect((chat.signature = "98237503257"));
    });
});