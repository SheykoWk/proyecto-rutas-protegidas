const checkUsers=require('./auth.controllers')
const response= require('../utils/responses.handler')
const jwt=require('jsonwebtoken')
const config=require('../../config')

const authentication=(req, res)=>{
    const {email, password}=req.body
    checkUsers(email, password)
        .then(data=> {
            if(data){
                const token=jwt.sign({
                    id:data.id,
                    email:data.email,
                    firstName:data.firstName,
                }, config.api.jwtSecret,{
                expiresIn:'2d'
                } )
                response.success({
                    res,
                    status:200,
                    message:'user is OK',
                    data: token
                })
            }else{
                response.error({
                    res,
                    status:401,
                    message:'Invalid User'
                })
            }

        })
        .catch(err=>{
            response.error({
                res,
                status:400,
                data:err.message
            })
        })

}

module.exports = authentication