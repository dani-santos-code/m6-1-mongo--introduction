"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { getCollection } = require("./exercises/exercise-1-2");
const { createGreeting, getGreeting } = require("./exercises/exercise-2");
const PORT = process.env.PORT || 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // exercise 1
  .get("/data/:dbName/:collection", getCollection)
  .post("/ex-2/greeting", createGreeting)
  .get("/ex-2/:_id", getGreeting)

  // exercise 2

  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
