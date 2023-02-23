const router = require('express').Router()
const jwtPassport = require('../middlewares/auth.middleware')
const userServices = require('./users.services')

router.get('/', userServices.getAllUsers)
router.post('/', userServices.postNewUser)

router.get('/:id', userServices.getUserById)
router.patch('/:id',jwtPassport, userServices.patchUser)
router.delete('/:id', jwtPassport, userServices.deleteUser)

module.exports = router