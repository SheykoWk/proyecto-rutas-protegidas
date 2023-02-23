//? ExtractJWT nos sirve para sacar el token del header
//? Strategy contiene la clave secreta para encriptar el token
const { ExtractJwt, Strategy } = require("passport-jwt");
const passport = require("passport");
const { findUserById } = require("../users/users.controllers");
require("dotenv").config();

const passportConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(passportConfig, (tokenDecoded, done) => {
    findUserById(tokenDecoded.id)
      .then((user) => {
        if (user) {
          done(null, tokenDecoded);
        } else {
          done(null, false, { message: "Token incorrect" });
        }
      })
      .catch((err) => {
        done(err, false);
      });
  })
);

module.exports = passport.authenticate("jwt", { session: false });
