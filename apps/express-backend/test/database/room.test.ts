import {RoomModel} from "../../src/schemas/room.model";
describe("Check room endpoints", () => {
    it("Get all rooms", async () => {
        const response = await fetch("http://localhost:3000/api/rooms", { 
          method: "GET"
        });
        console.log(response.body);
        expect(response.status).toBe(200);
      });

      it("Get single room by ID", async () => {
        const response = await fetch("http://localhost:3000/api/rooms/62a9a6d2eb3430181f489291", { 
          method: "GET"
        });
        console.log(response.body);
        expect(response.status).toBe(200);
      });

      it("Update a room", async () => {
        const response = await fetch("http://localhost:3000/api/rooms/62a9a6d2eb3430181f489291", { 
          method: "PUT",
          body: JSON.stringify({
            person: "62a9a6d2eb3430181f489291",
            title: "testtitle",
            isLive: true,
            viewers: 100
          })
        });
        console.log(response.body);
        expect(response.status).toBe(200);
      });

      it("Get chats from a room", async () => {
        const response = await fetch("http://localhost:3000/api/rooms/62a9a6d2eb3430181f489291/chats", { 
          method: "GET"
        });
        console.log(response.body);
        expect(response.status).toBe(200);
      });

      it("Create a room", async () => {
        const response = await fetch("http://localhost:3000/api/rooms", { 
          method: "POST",
          body: JSON.stringify({
            person: "62a9a6d2eb3430181f489291",
            title: "newroomtesttitle",
            isLive: false,
            viewers: 1
          })
        });
        console.log(response.body);
        expect(response.status).toBe(200);
      });
});

