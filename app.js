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

const app = express();

mongoose.Promise = bluebird;
connect({ promiseLibrary: bluebird, useNewUrlParser: true })
  .then(() => console.log("db connection successful"))
  .then(() => {
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
