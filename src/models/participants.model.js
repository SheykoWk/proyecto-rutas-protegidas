const { DataTypes } = require("sequelize");

const db = require("../utils/database");
const Conversations = require("./conversations.model");
const Users = require("./users.model");

const Participants = db.define("participants", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: Users,
        key: 'id'
    }
  },
  conversationId: {
    type: DataTypes.UUID,
    allowNull: false, 
    references: {
        model: Conversations,
        key: 'id'
    }
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Participants