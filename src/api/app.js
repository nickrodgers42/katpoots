require("@babel/polyfill");
import bodyParser from "body-parser";
import express from "express";
import logger from "morgan";
import path from "path";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { connect } from "../data/db";

mongoose.Promise = bluebird;
connect({ promiseLibrary: bluebird, useNewUrlParser: true })
  .then(() => console.log("db connection successful"))
  .catch(err => console.error(err));

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "build")));

require("./controllers")(app);
app.listen(3004, () => {
  console.log("API listening on port 3004");
});

module.exports = app;
