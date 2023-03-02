const { ExtractJwt, Strategy } = require('passport-jwt')
const config = require('../../config')
const passport = require('passport')
const { findUserById } = require('../users/users.controllers')


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.api.jwtSecret
}

passport.use(new Strategy(opts, (payload, done) => {
  findUserById(payload.id)
    .then(data => {
      if (data) {
        done(null, payload)
      }else {
        done(null, false, { message: 'Token Incorrect' })
      }
    })
    .catch(error => {
      done(error, false)
    })
}))

module.exports = passport.authenticate('jwt', { session: false })