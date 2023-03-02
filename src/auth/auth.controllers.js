const { findUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto') 

const checkUsersCredentials = async (email, password) => {
  try {
    const user = await findUserByEmail(email)
    const isPasswordValid = comparePassword(password, user.password)
    if (isPasswordValid) {
      return user
    }else {
      return null
    }
  } catch (error) {
    return null
  }
}

module.exports = checkUsersCredentials