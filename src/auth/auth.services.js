const checkUsersCredentials = require("./auth.controllers")
const jwt = require('jsonwebtoken')
const Responses = require('../utils/responses.handler')

const postLogin = (req, res) => {
    const { email, password } = req.body

    checkUsersCredentials(email, password)
        .then(data => {
            if (data) {
                const token = jwt.sign({
                    id: data.id,
                    email: data.email
                }, process.env.JWT_SECRET, {
                    expiresIn: '1d'
                })

                Responses.success({
                    res,
                    status: 200,
                    message: 'User authenticated',
                    data: token
                })
            }
            else 
                Responses.error({
                    res,
                    status: 401,
                    message: 'Wrong credentials'
                })
        })
        .catch(err => {
            Responses.error({
                res,
                status: 400,
                data: err,
                message: 'Something went wrong in authentication'
            })
        })
}

module.exports = postLogin