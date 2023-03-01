const router = require('express').Router()

const userServices = require('./users.services')
const passportJwt = require('../middlewares/auth.middleware')

router.get('/', passportJwt,userServices.getAllUsers)
router.post('/', passportJwt,userServices.postNewUser)

router.get('/:id', passportJwt,userServices.getUserById)
router.patch('/:id', passportJwt,userServices.patchUser)
router.delete('/:id', passportJwt,userServices.deleteUser)

module.exports = router