const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')

const uuid = require('uuid')


const findAllConversationsByUser = async (userId) => {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            where: {
                userId: userId
            }
        }
    })
    return data.map(({
        id, 
        name, 
        profileImage, 
        isGroup, 
        createdAt
    }) => ({
        id, 
        name, 
        profileImage, 
        isGroup, 
        createdAt
    }))
}

const createConversation = async (conversationObj, userOwnerId, userGuestId) => {

    // Validates if user participant does not exists
    const userGuest = await Users.findOne({where: {id: userGuestId}})

    if(!userGuest){
        return false
    } 

    const newConversation = await Conversations.create({
        id: uuid.v4(),
        name: conversationObj.name,
        profileImage: conversationObj.profileImage,
        isGroup: conversationObj.isGroup
    })

    // Owner participant
    await Participants.create({
        id: uuid.v4(),
        userId: userOwnerId,
        conversationId: newConversation.id,
        isAdmin: true
    })

    // Guest participant
    await Participants.create({
        id: uuid.v4(),
        userId: userGuestId,
        conversationId: newConversation.id,
        isAdmin: false
    })

    return newConversation
}


module.exports = {
    createConversation,
    findAllConversationsByUser
}