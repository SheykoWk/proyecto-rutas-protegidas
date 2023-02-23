const passport = require('passport')
const {ExtractJwt, Strategy} = require('passport-jwt')
require('dotenv').config()
const {findUserById} = require('../users/users.controllers')

const configs = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new Strategy(configs, (tokenDecoded, done)=>{
  findUserById(tokenDecoded.id)
    .then(data => {
      if(data){
        done(null,tokenDecoded)
      } else {
        done(null, false)
      }
    })
    .catch(error => {
      done(error, false)
    })
}))

module.exports = passport.authenticate('jwt', {session: false})