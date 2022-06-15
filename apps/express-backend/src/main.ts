import * as express from "express";
const app = express();
import router from "./app/router/router";
import errors = require("./app/helpers/errors");
import mongoDB = require("./db.connection");
import BodyParser = require("body-parser");

mongoDB.connectToMongo();
app.use(BodyParser.json());

app.use("/api", router);

app.use("*", function (_, res) {
  res.status(404).end();
});

// error responses
app.use("*", function (err, req, res, next) {
  console.error(`${err.name}: ${err.message}`);
  next(err);
});

app.use("*", errors.handlers);

app.use("*", function (err, req, res, next) {
  if (err.code === "invalid_token") {
    res.status(401).json({
      error: "Token invalid",
    });
  } else {
    res.status(500).json({
      error: "Something unexpected happened. Please contact developers.",
    });
  }
});

app.use(async (err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
