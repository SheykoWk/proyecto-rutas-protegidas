const messageControllers = require('./messages.controllers')
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

module.exports = {
    getAllMessagesByConversation
}