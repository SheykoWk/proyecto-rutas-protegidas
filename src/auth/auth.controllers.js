const { findUserByEmail } = require("../users/users.controllers")
const { comparePassword } = require("../utils/crypto")


const checkUsersCredentials = async (email, password) => {
    try {
        const user = await findUserByEmail(email)
        const veryfiedPassword = comparePassword(password, user.password)

        return veryfiedPassword
    } catch (error){
        return false
    }
}

module.exports = checkUsersCredentials