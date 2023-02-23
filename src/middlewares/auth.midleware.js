//ExtractJwt: 
//Strategy: configura 
const {ExtractJwt, Strategy}=require('passport-jwt')
const passport=require('passport')
const config=require('../../config')

const {findUserById}=require('../users/users.controllers')

//generamos las configuraciones basicas
const passportConfigs={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:config.api.jwtSecret
}

passport.use(new Strategy(passportConfigs, (tokenDecoded,done)=>{
    findUserById(tokenDecoded.id)
        .then(data=>{
            if (data) {
                done(null, tokenDecoded, {message:'user is there in our base data'})
            }else{
                done(null, false, {message:'Token wrong! 🥵 the token is invalid check credentail'})
            }
        })
        .catch(err=>{
            done(err, false, {message:err.message})
        })
}))

module.exports=passport.authenticate('jwt', {session:false})