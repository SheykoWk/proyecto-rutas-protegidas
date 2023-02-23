//! npm i passport-jwt passport

const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')

const { findUserById } = require('../users/users.controllers')

const jwtSecret = require('../../config').api.jwtSecret

const passportConfigs = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}

passport.use(new Strategy(passportConfigs, (tokenDecoded, done)=>{
    findUserById(tokenDecoded.id)
    .then(data=>{
        if(data){
            done(null, tokenDecoded)
        }else{
            done(null, false, {message: 'Incorrect token'})
        }
    }).catch(err=>{
        done(err, false)
    })
}))

module.exports = passport.authenticate('jwt', {session: false})