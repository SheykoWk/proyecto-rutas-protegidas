const authRouter = require('./auth.services')
const router = require('express').Router()

router.post('/login', authRouter )

module.exports = router

