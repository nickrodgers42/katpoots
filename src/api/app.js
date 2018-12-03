require("@babel/polyfill");
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import express from "express";
import logger from "morgan";
import session from "express-session";
import mongoose from "mongoose";
import bluebird from "bluebird";
import passport from "passport";
import { Strategy } from "passport-local";
import { connect } from "../data/db";
import { loadModels } from "../data/models";
import connectMongo from "connect-mongo";
import path from "path";

mongoose.Promise = bluebird;
connect({ promiseLibrary: bluebird, useNewUrlParser: true })
  .then(() => console.log("db connection successful"))
  .catch(err => console.error(err));
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

const app = express();
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

require("./controllers")(app);
app.listen(process.env.PORT || 3004, () => {
  console.log("API listening on port 3004");
});

app.get("/", (req, res) => {
  const index = path.join(__dirname, "build", "index.html");
  console.log(index);
  res.sendFile(index);
});

module.exports = app;
