const express = require("express");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
const authRouter = express.Router();

authRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    const user = req.body;
    return res.json({ message:'successful signup', user });
  }
);

authRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (user) {
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          const body = { _id: user._id, email: user.email };
          
          req.session.deviceId = req.headers["user-agent"];
          res.cookie("sessionId", req.session.id);
          return next(res.json(user));
        });
      }
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(res.json({ error: "Email or password is incorrect" }));
      }
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = authRouter;