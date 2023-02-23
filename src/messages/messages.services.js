const messageControllers = require('./messages.controller')
const responses = require('../utils/handleResponses')

const getAllMessagesByConversation = (req, res) => {
    const conversationId = req.params.conversation_id
    const userId = req.user.id

    messageControllers.findAllMessagesByConversation(conversationId, userId)
        .then(data => {
            if(data){
                responses.success({
                    res,
                    data,
                    status: 200,
                    message: `Messages for the conversation with id: ${conversationId}`
                })
            } else {
                responses.error({
                    res,
                    status: 401,
                    message: 'You are not participant from this conversation'
                })
            }
        })
        .catch(err => {
            responses.error({
                res,
                status: 400,
                message: 'Error finding all messages by conversation',
                data: err
            })
        })
}

const validateUserOnConversation = (req, res) => {
    const userId = req.user.id
    const conversationId = req.params.conversationId

    messageControllers.validateUserOnConversation(userId, conversationId)
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    getAllMessagesByConversation,
    validateUserOnConversation
}