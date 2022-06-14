
import * as express from "express";
const app = express();
import router from "./app/router/router";
import mongoDB = require("./db.connection");

mongoDB.connectToMongo();

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);
app.get("*", (req, res) => {
  res.send({ message: "Use /api" });
});


const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
