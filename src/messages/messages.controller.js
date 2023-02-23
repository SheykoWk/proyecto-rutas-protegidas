const Messages = require('../models/messages.model')
const Participants = require('../models/participants.model')

const findAllMessagesByConversation = async (conversationId, userId) => {
    const data = await Messages.findAll({
        include: {
            model: Participants,
            where: {
                conversationId: conversationId,
                userId: userId
            }
        }
    })
    return data
}

const validateUserOnConversation = async( userId, conversationId ) => {
    const data = await Participants.findOne({
        where: {
            userId,
            conversationId
        }
    })
    return data
}

module.exports = {
    findAllMessagesByConversation,
    validateUserOnConversation
}