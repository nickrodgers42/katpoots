import { loadModels } from "../../data/models";
import passport from "passport";

module.exports = function(server) {
  server.post("/api/register", createUser);
  server.post("/api/login", passport.authenticate("local", { failureRedirect: "/login" }), signIn);
  server.get("/api/logout", logout);
};

async function createUser(req, res, next) {
  try {
    const models = await loadModels();
    const newUser = await new models.user(Object.assign({}, req.body, { email: req.body.email.toLowerCase() })).save();
    const userObj = newUser.toObject();
    delete userObj.password;
    res.json(userObj);
    next();
  } catch (e) {
    res.status(500).send({ error: e.message });
    next(e);
  }
}

function signIn(req, res, next) {
  res.json(req.user);
  next();
}

function logout(req, res, next) {
  req.logout();
  res.redirect("/");
  next();
}
