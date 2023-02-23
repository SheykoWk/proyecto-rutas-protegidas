const {ExtractJwt, Strategy}=require('passport-jwt')
const passport=require('passport')
const config=require('../../config')

const {findUserById}=require('../users/users.controllers')

const passportConfigs={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:config.api.jwtSecret
}

passport.use(new Strategy(passportConfigs, (tokenDecoded,done)=>{
    findUserById(tokenDecoded.id)
        .then(data=>{
            if (data) {
                done(null, tokenDecoded, {message:'user is on Data Base'})
            }else{
                done(null, false, {message:'Invalid User - Token is wrong!'})
            }
        })
        .catch(err=>{
            done(err, false, {message:err.message})
        })
}))

module.exports=passport.authenticate('jwt', {session:false})