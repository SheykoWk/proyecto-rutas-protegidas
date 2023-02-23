const router = require('express').Router()

const passportJwt = require('../middleware/auth.middleware')

const messagesService = require('./messages.services')

router.route('/messages')
    .get(passportJwt, messagesService.getAllMessagesByConversation)

module.exports = router