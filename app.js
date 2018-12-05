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
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socket(server);

io.on("connection", socket => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));

  socket.on("add user", message => {
    const data = JSON.parse(message);
    io.emit("user joined", data.student);
  });

  socket.on("increase vote count", message => {
    const data = JSON.parse(message);
    socket.broadcast.emit("vote counted", data.answer);
  });

  socket.on("reset vote count", () => {
    io.emit("reset votes");
  });

  socket.on("next question", message => {
    const data = JSON.parse(message);
    io.emit("go to next question", data.index);
  });

  socket.on("change question status", message => {
    const data = JSON.parse(message);
    io.emit("update question status", data.closeQuestion);
  });

  socket.on("update questions", message => {
    const data = JSON.parse(message);
    io.emit("refresh questions", data.quizId);
  });

  socket.on("update answers", message => {
    const data = JSON.parse(message);
    io.emit("refresh answers", data.questionId);
  });
});

mongoose.Promise = bluebird;
connect({ promiseLibrary: bluebird, useNewUrlParser: true })
  .then(() => console.log("db connection successful"))
  .catch(err => console.error(err));

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  console.log(path.join(__dirname, "build", "index.html"));
  res.sendFile(path.join(__dirname, "build", "index.html"));
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

require("./core/api/controllers")(app);
server.listen(process.env.PORT || 3004, () => {
  console.log("API listening on port 3004");
});

module.exports = app;
