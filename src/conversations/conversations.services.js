const conversationControllers = require('./conversations.controller')
const responses = require('../utils/handleResponses')

const getAllConversationsByUser = (req, res) => {
    const userId = req.user.id

    conversationControllers.findAllConversationsByUser(userId)
        .then(data => {
            responses.success({
                res,
                status:200,
                message: data.length ? 'Showing all your conversations': 'No conversations to show',
                data
            })
        })
        .catch(err => {
            responses.error({
                res, 
                status: 400,
                message: 'Something bad',
                data: err
            })
        })
}

const postNewConversation = (req, res) => {

    const ownerId = req.user.id
    const {guestId, ...conversationObj} = req.body 

    conversationControllers.createConversation(conversationObj, ownerId, guestId)
        .then(data => {
            if(data) {
                responses.success({
                    res,
                    status: 201,
                    message: 'Conversation created successfully!',
                    data
                })
            } else {
                responses.error({
                    res,
                    status: 400,
                    message: `User with id: ${guestId} not found`,
                })
            }
        })
        .catch(err => {
            responses.error({
                res,
                status: 400,
                message: err.message || 'Something bad',
                data: err,
                fields: {
                    name: 'String',
                    profileImage: 'String',
                    isGroup: 'boolean',
                    guestId: 'String UUID'
                }
            })
        })
}

module.exports = {
    getAllConversationsByUser,
    postNewConversation
}