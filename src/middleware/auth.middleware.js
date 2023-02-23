const { ExtractJwt, Strategy } = require("passport-jwt");
const passport = require("passport");
const { findUserById } = require("../users/users.controllers.js");
require("dotenv").config();

const passportConfigs = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
passport.use(
  new Strategy(passportConfigs, (tokenDecoded, done) => {
    findUserById(tokenDecoded.id)
      .then((data) => {
        if (data) {
          done(null, tokenDecoded);
        } else {
          done(null, false, { message: "invalid token" });
        }
      })
      .catch((error) => {
        done(error, false);
      });
  })
);
module.exports = passport.authenticate("jwt", { session: false });
