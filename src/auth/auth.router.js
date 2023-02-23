const router=require('express').Router()
const authentication=require('../auth/auth.services')
router.post('/login', authentication)
module.exports=router