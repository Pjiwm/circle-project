import { RoomModel } from "../../src/schemas/room.model";
import { PersonModel } from "../../src/schemas/person.model";
describe("Chat mongoose schema works", () => {
  afterEach(() => {
    PersonModel.deleteMany();
    RoomModel.deleteMany();
  });
  let person;
  let updatePerson;
  let room;
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
  // it("Adds a follower to an existing person",async () => {
  //   updatePerson = await new PersonModel({
  //     name: "Henk",
  //     publicKey: "554433",
  //     satochi: 10,
  //     followed: []
  //   });

  //   //await updatePerson.save();

  //   room = await new RoomModel({
  //     streamer: "62a9a6h6sb34936817gh9291",
  //     person: 1234,
  //     title: "Superroom",
  //     isLive: true,
  //     viewers: 100
  //   });

  //   //await room.save();

  //   await PersonModel.updateOne({ _id: updatePerson._id },{ $push: { followed: room }});
    
  //   console.log(updatePerson.followed);
  //   expect((updatePerson.followed = [{_id: 200,person: 1234,title: "Superroom",isLive: true,viewers: 100}]));
  
  // });
});
