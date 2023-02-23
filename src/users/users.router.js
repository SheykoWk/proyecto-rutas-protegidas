const router = require('express').Router()

const userServices = require('./users.services')
const passportJwt = require('../middleware/auth.middleware')

router.get('/', userServices.getAllUsers)
router.post('/', userServices.postNewUser)

router.get('/me', passportJwt, userServices.getMyUser)
router.patch('/me', passportJwt, userServices.patchMyUser)

router.get('/:id', userServices.getUserById)
router.patch('/:id', userServices.patchUser)
router.delete('/:id', userServices.deleteUser)

module.exports = router