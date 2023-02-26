const { ExtractJwt ,Strategy } = require( 'passport-jwt' )
const passport = require( 'passport' )
const configs = require( '../../config' )
const { findUserById } = require('../users/users.controllers')

const passportConfigs = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configs.api.jwtSecret
}

passport.use( new Strategy( passportConfigs, ( tokenDecoded, done ) => {
    findUserById( tokenDecoded.id ) 
        .then( data => data ?
                done( null,  tokenDecoded )  
            :
                done( null, false  )
        )
        .catch( err => done( err, false ) )
} ) )

module.exports = passport.authenticate( 'jwt', {session: false} )