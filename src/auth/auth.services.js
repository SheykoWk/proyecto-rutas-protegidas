const checkUserCredentials = require( './auth.controllers' )
const {  error, success} = require( '../utils/responses.handler' )
const jwt = require( 'jsonwebtoken' )
const {api} = require( '../../config' )

const postLogin = ( req, res ) => {
    console.log(req)
    const {email, password} = req.body
    
    checkUserCredentials( email, password )
        .then( data => data ?
            success({
                res,
                status:200,
                message: 'Correct credentials',
                data: jwt.sign( {
                    id: data.id,
                    email: data.email,
                    firstName: data.firstName
                }, api.jwtSecret)
            }) 
            :
            error({
                res,
                status: 401,
                message: 'Invalid credentials'
            })
        )
        .catch( err => error(({
            res,
            status: 400,
            message: 'Something Bad'
        })) )
}

module.exports = {
    postLogin
}