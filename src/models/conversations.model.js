const { DataTypes } = require("sequelize");

const db = require("../utils/database");

const Users = require("../models/users.model")

const Conversations = db.define("conversations", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage:{
    type: DataTypes.STRING
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: Users,
        key: 'id'
    }
  },
  isGroup: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Conversations