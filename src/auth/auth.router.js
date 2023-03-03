const authRouter = require( 'express' ).Router()
const {postLogin} = require( './auth.services' )

authRouter.post( '/login',  postLogin )

module.exports = authRouter