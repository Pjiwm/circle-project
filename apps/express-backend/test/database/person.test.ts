import { PersonModel } from "../../src/schemas/person.model";
describe("Chat mongoose schema works", () => {
  let person;
  it("Creates a chat model", async () => {
    person = await new PersonModel({
      Name: "Mr. Bean",
      PublicKey: "123456789",
      Satochi: 100,
    });
    expect((person.Name = "Mr. Bean"));
    expect((person.PublicKey = "123456789"));
    expect((person.Satochi = 100));
  });

//   TODO advanced object test.
//   it("Adds a follower to an existing person", async () => {
//     const streamer = await new PersonModel({

//     await PersonModel.updateOne(
//       { _id: person._id },
//       { $push: { Followed: { $each: [{ _id: "123456789" }] } } }
//     );
//     console.log(person.Followed);
//     expect((person.Followed = [{ _id: "123456789" }]));
//   });
});
