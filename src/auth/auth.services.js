const checkUsersCredentials = require('./auth.controllers')
const response = require('../utils/responses.handler')
const jwt = require('jsonwebtoken')
const config = require('../../config')

const postLogin = (req, res) => {
  const { email, password } = req.body
  checkUsersCredentials(email, password)
    .then(data => {
      if (data) {
        const token = jwt.sign({
          id: data.id,
          email: data.email,
          firstName: data.firstName
        }, config.api.jwtSecret, {
          expiresIn: '1d'
        })

        response.success({
          res,
          status: 200,
          message: 'Correct Credentials',
          data: token
        })
      }else{
        response.error({
          res,
          status: 401,
          message: 'Invalid Credentials'
        })
      }
    })

    .catch(error => {
      response.error({
        res,
        status: 400,
        data: error,
        message: 'Something went wrong',
      })
    })
}

module.exports = postLogin