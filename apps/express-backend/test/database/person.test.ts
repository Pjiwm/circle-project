import { request } from "http";
import { PersonModel } from "../../src/schemas/person.model";
import * as router from "express";
const routes = router.Router();
import person from "../../src/app/router/person.router";

describe("Check person endpoints", () => {
  it("Get all persons", async () => {
    const response = await fetch("http://localhost:3000/api/persons/", { 
      method: "GET"
    });
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  it("Get single persons by ID", async () => {
    const response = await fetch("http://localhost:3000/api/persons/62a9a6d2eb3430181f489291", { 
      method: "GET"
    });
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  // it("Create Person", async () => {
  //   const response = await fetch("http://localhost:3000/api/persons/", { 
  //     method: "POST",
  //     body: JSON.stringify({
  //       name: "Testman",
  //       publicKey: "testkey",
  //       satochi: 0,
  //       followed: []
  //   })
  //   });
  //   console.log(response.body);
  //   expect(response.status).toBe(200);
  // });
});
