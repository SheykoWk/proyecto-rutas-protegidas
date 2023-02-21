const Messages = require('../models/messages.models')
const Participants = require('../models/participants.models')

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
    findAllMessagesByConversation
}