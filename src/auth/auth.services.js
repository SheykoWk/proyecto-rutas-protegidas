const checkUsersCredentials=require('./auth.controllers')
const response= require('../utils/responses.handler')
const jwt=require('jsonwebtoken')
const config=require('../../config')

const postLogin=(req, res)=>{
    const {email, password}=req.body
    checkUsersCredentials(email, password)
        .then(data=> {
            if(data){
                const token=jwt.sign({
                    id:data.id,
                    email:data.email,
                    firstName:data.firstName,
                }, config.api.jwtSecret,{
                expiresIn:'5d'
                } )
                response.success({
                    res,
                    status:200,
                    message:'credential authenticared! 🥳',
                    data: token
                })
            }else{
                response.error({
                    res,
                    status:401,//unauthorazed
                    message:'Invalid Credential'
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

module.exports=postLogin