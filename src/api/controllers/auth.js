import { loadModels } from "../../data/models";
import passport from "passport";
import { ensureLoggedIn } from "connect-ensure-login";

module.exports = function(server) {
  server.get("/api/user", ensureLoggedIn(), getUser);
  server.post("/api/register", createUser);
  server.post("/api/login", passport.authenticate("local", { failureRedirect: "/login" }), signIn);
  server.get("/api/logout", logout);
  server.get("/api/user/:userId", ensureLoggedIn(), getUserById);
  server.delete("/api/user/:userId", ensureLoggedIn(), deleteUser);
};

async function getUser(req, res, next) {
  res.json(req.user);
  next();
}

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

async function getUserById(req, res, next) {
  try {
    const models = await loadModels();
    const user = await models.user.findById(req.params.userId).populate({
      path: "quizzes",
      populate: {
        path: "questions",
        populate: {
          path: "answers"
        }
      }
    });
    if (!user) {
      res.status(404).send({ error: `User with ID ${req.params.userId} not found!` });
      return next();
    }
    res.json(user);
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

async function deleteUser(req, res, next) {
  try {
    const models = await loadModels();
    const User = await models.user;
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).send({ error: `User with ID ${req.params.userId} not found!` });
      return next();
    }
    if (user._id.toString() !== req.user._id) {
      res.status(401).send({ error: `Unauthorized: can only delete own account` });
      next();
    }
    user.delete();
    res.json({ success: "true" });
    next();
  } catch (e) {
    res.status(500).send({ error: e.message });
    next(e);
  }
}
