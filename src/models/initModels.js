const Conversations = require("./conversations.model")
const Messages = require("./messages.model")
const Participants = require("./participants.model")
const Users = require("./users.model")

const initModels = () => {
    
    //? Users -> Participants
    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    //? Conversations -> Participants
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)

    //? Participants -> Messages
    Participants.hasMany(Messages)
    Messages.belongsTo(Participants)

}

module.exports = initModels