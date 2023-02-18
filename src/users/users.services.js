const usersControllers = require('./users.controllers')
const responses = require('../utils/responses.handler')

const getAllUsers = (req, res) => {
    usersControllers.findAllUser()
        .then(data => {
            responses.success({
                    status: 200,
                    data: data,
                    message: 'Getting all Users',
                    res
                })
        })
        .catch(err => {
            responses.error({
                    status: 400,
                    data: err,
                    message: 'Something bad getting all users',
                    res
                })
        })
}

const getUserById = (req ,res) => {
    const id = req.params.id 
    usersControllers.findUserById(id)
        .then(data => {
            if(data){
                responses.success({
                    status: 200,
                    data,
                    message: `Getting User with id: ${id}`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    message: `User with ID: ${id}, not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Something bad getting the user',
                res
            })
        })
}

const postNewUser = (req, res) => {
    const userObj = req.body
    usersControllers.createNewUser(userObj)
        .then(data => {
            responses.success({
                status: 201,
                data,
                message: `User created succesfully with id: ${data.id}`,
                res
            })
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Error ocurred trying to create a new user',
                res,
                fields: {
                    firstName : 'String',
                    lastName : 'String',
                    email: 'example@example.com',
                    password: 'String',
                    profileImage: 'example.com/image.png',
                    phone : '+52 1234 123 123'
                }
            })
        })
}

const patchUser = (req, res) => {
    const id = req.params.id 
    const userObj = req.body 

    usersControllers.updateUser(id, userObj)
        .then(data => {
            if(data){
                responses.success({
                    status: 200,
                    data, 
                    message: `User with id: ${id} modified successfully`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    message: `The user with ID ${id} not found`,
                    res,
                    fields: {
                        firstName : 'String',
                        lastName : 'String',
                        email: 'example@example.com',
                        password: 'String',
                        profileImage: 'example.com/image.png',
                        phone : '+52 1234 123 123'
                    }
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: `Error ocurred trying to update user with id ${id}`,
                res,
                fields: {
                    firstName : 'String',
                    lastName : 'String',
                    email: 'example@example.com',
                    password: 'String',
                    profileImage: 'example.com/image.png',
                    phone : '+52 1234 123 123'
                }
            })
        })
}

const deleteUser = (req, res) => {
    const id = req.params.id 

    usersControllers.deleteUser(id)
        .then(data => {
            if(data){
                responses.success({
                    status: 200,
                    data, 
                    message: `User with id: ${id} deleted successfully`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    data: err,
                    message: `The user with ID ${id} not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: `Error ocurred trying to delete user with id ${id}`,
                res
            })
        })
}
//! add rutas protejidas
const getMyUser=(req, res)=>{
    const id=req.user.id
    usersControllers.findUserById(id)
        .then(data=> {
            responses.success({
                res,
                status:200,
                message:'This woner data of user',
                data
            })
        })
        .catch(err=>{
            responses.error({
                res,
                status:400,
                message:'somethin wrong',
                data:err.message
            })
        })
}

const deleteMyUser=(req, res)=>{
    const id=req.user.id
    usersControllers.deleteUser(id)
        .then(data=>{
            responses.success({
                res,
                status:200,
                message:`user deleted successfully with ID: ${id}`
            })
        })
        .catch(res=>{
            responses.error({
                res,
                status:400,
                message:err.message
            })
        })
}

const patchMyUser=(req, res)=>{
    const id=req.user.id
    const {firstName, lastName, email, password, profileImage, phone}=req.body
    const userObj={firstName, lastName, email, password, profileImage, phone}
    usersControllers.updateUser(id, userObj)
        .then(()=>{
            responses.success({
                res,
                status:200,
                message:'tour user has been updater successfully!😜'  
            })
        })
        .catch(err=>{
            responses.error({
                res,
                status:400,
                message:err.message,
                data:err
            })
        })
}


module.exports = {
    getAllUsers,
    getUserById,
    postNewUser,
    patchUser,
    deleteUser,
    getMyUser,
    deleteMyUser,
    patchMyUser
}