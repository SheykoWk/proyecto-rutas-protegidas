const {findUserByEmail} = require('../users/users.controllers')
const {comparePassword} = require('../utils/crypto')

const checkUsersCredentials = async (email, password) => {
  try{
    const user = await findUserByEmail(email)
    const verifyPassword = comparePassword(password, user.password)
    if (verifyPassword){
      return user
    } else {
      false
    }
  } catch (error){
    console.log('error')
    throw  new Error(error)
  }
}
module.exports = {checkUsersCredentials}