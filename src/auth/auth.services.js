const  checkUserCredentials  = require('../auth/auth.controllers')
const responses = require('../utils/responses.handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const postLogin = (req, res) => {

  const { email, password } = req.body
  checkUserCredentials(email, password)
    .then( data => {
      if(data){

        const token = jwt.sign({
          id: data.id,
          email: data.email,
          firstName: data.firstName
        }, process.env.JWT_SECRET,{ expiresIn: '1d'})

        responses.success({
          res,
          status:200,
          message: 'credentials verified',
          data: token
        })
      } else {
        responses.error({
          res,
          status:401,
          message: 'Invalid credentials',             
        })
      }
    })
    .catch( err => {
      responses.error({
        res,
        status:400,
        message: 'something went wrong',            
      })
    })
}

module.exports = postLogin