const router = require('express').Router()

const userServices = require('./users.services')

router.get('/', userServices.getAllUsers)
router.post('/', userServices.postNewUser)

router.get('/:id', userServices.getUserById)
router.patch('/:id', userServices.patchUser)
router.delete('/:id', userServices.deleteUser)

module.exports = router