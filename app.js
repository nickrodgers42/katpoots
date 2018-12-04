const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const passport = require("passport");
const { Strategy } = require("passport-local");
const { connect } = require("./core/data/db");
const { loadModels } = require("./core/data/models");
const connectMongo = require("connect-mongo");
const path = require("path");
const socket = require("socket.io");
const http = require("http");

const app = express();
const server = http.Server(app);
const io = socket(server);

mongoose.Promise = bluebird;
connect({ promiseLibrary: bluebird, useNewUrlParser: true })
  .then(() => console.log("db connection successful"))
  .then(() => {
    io.on("connection", socket => {
      console.log("Client connected");
      socket.on("disconnect", () => console.log("Client disconnected"));
    });

    io.on("ADD_USER", message => {
      const data = JSON.parse(message);
      io.emit({ type: "USER_JOINED", student: data.student });
    });

    io.on("INCREASE_VOTE_COUNT", message => {
      const data = JSON.parse(message);
      io.emit({ type: "VOTE_COUNTED" });
    });

    io.on("RESET_VOTE_COUNT", message => {
      const data = JSON.parse(message);
      io.emit({ type: "RESET_VOTES" });
    });

    io.on("NEXT_QUESTION", message => {
      const data = JSON.parse(message);
      io.emit({ type: "GO_TO_NEXT_QUESTION", index: data.index });
    });

    io.on("CHANGE_QUESTION_STATUS", message => {
      const data = JSON.parse(message);
      io.emit({ type: "UPDATE_QUESTION_STATUS", closeQuestion: data.closeQuestion });
    });

    io.on("UPDATE_QUESTIONS", message => {
      const data = JSON.parse(message);
      io.emit({ type: "REFRESH_QUESTIONS", quizId: data.quizId });
    });

    io.on("UPDATE_ANSWERS", message => {
      const data = JSON.parse(message);
      io.emit({ type: "REFRESH_ANSWERS", questionId: data.questionId });
    });

    passport.use(
      new Strategy(async function(username, password, cb) {
        try {
          const models = await loadModels();
          const user = await models.user.findOne({ username });
          if (!user) return cb(null, false, { message: "Incorrect username" });
          if (!user.validPassword(password)) return cb(null, false, { message: "Incorrect password" });
          const cleanUser = await models.user.findOne({ username }, { password: 0 });
          return cb(null, cleanUser);
        } catch (e) {
          return cb(e);
        }
      })
    );
    passport.serializeUser(function(user, cb) {
      cb(null, user._id);
    });

    passport.deserializeUser(function(id, cb) {
      loadModels()
        .then(models => models.user.findById(id, { password: 0 }))
        .then(user => cb(null, user))
        .catch(cb);
    });

    const MongoStore = connectMongo(session);

    app.use(logger("dev"));
    app.use(cookieParser());
    app.use(
      session({
        secret: ",?DT|f@uMG@OM$f9rm1n#>{|Y-'m_feToXSIq.jLAb_#3cnr_0iJfx^J`ItL4E/",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
          url: process.env.MONGOLAB_GREEN_URI || "mongodb://localhost/group10"
        })
      })
    );
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: "false" }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, "build")));

    app.get("/", (req, res) => {
      console.log(path.join(__dirname, "build", "index.html"));
      res.sendFile(path.join(__dirname, "build", "index.html"));
    });

    require("./core/api/controllers")(app);
    app.listen(process.env.PORT || 3004, () => {
      console.log("API listening on port 3004");
    });
  })
  .catch(err => console.error(err));

module.exports = app;
