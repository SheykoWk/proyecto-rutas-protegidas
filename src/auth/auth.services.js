const { success, error } = require("../utils/responses.handler");
const checkUsersCredentials = require("./auth.controllers");
const jwt = require('jsonwebtoken');


const postLogin = (req,res) =>{

    const {email, password} = req.body;

    checkUsersCredentials(email, password)
        .then(data=>{

            if(!data){
                error({
                    res,
                    status:401,
                    message:'Invalid credentials'
                })
            }

            const token = jwt.sign({
                id: data.id,
                email: data.email
            },'academlo',{
                expiresIn: '1d'
            });

            success({
                res,
                status:200,
                message:'login succesfully',
                data:token

            })
        })
        .catch(err=>{

            error({
                res,
                status:401,
                message:'Somthing wrong',
                data:err
            })
        })


}

module.exports = postLogin;