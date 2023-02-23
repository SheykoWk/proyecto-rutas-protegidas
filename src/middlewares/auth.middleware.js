const { ExtractJwt, Strategy} = require('passport-jwt');
const passport = require('passport');
const { findUserById } = require('../users/users.controllers');


const passportConfigs ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'academlo'
}

passport.use(new Strategy(passportConfigs,(tokenDecoded,done)=>{
    findUserById(tokenDecoded.id)
        .then(data=>{
            if (data) done(null,tokenDecoded)
            done(null,false)
        })
        .catch(err=>{
            done(err,false)
        })
}))

module.exports = passport.authenticate('jwt',{session:false});