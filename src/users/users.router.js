const router = require('express').Router()

const userServices = require('./users.services')
const passwordJwt = require('../middlewares/auth.middleware')

router.get('/', userServices.getAllUsers)
router.post('/', userServices.postNewUser)

router.get('/:id', userServices.getUserById)
router.patch('/:id', passwordJwt, userServices.patchUser)
router.delete('/:id', passwordJwt, userServices.deleteUser)

module.exports = router