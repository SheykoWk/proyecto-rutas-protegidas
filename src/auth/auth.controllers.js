const { findUserByEmail } = require("../users/users.controllers");
const { comparePassword } = require("../utils/crypto");

const checkUsersCredentials = async (email, password) => {
  try {
    const user = await findUserByEmail(email);
    const verifyPassword = comparePassword(password, user.password);
    if (verifyPassword) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return false;
  }
};

module.exports = checkUsersCredentials;
