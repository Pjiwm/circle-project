import {PersonModel} from "../../src/schemas/person.model";
import {ChatModel} from "../../src/schemas/chat.model";
import {Model} from "mongoose";
describe("Chat mongoose schema works", () => {
    test("Creates a chat model", async () => {
        const person = PersonModel.create({});
        const chat = ChatModel.create({});
    });
});