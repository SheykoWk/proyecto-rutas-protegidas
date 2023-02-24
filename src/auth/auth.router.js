const postLogin = require('./auth.services')
const router = require('express').Router()

router.post('/login', postLogin)

module.exports = router