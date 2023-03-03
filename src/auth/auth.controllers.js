const { findUserByEmail } = require( '../users/users.controllers' )
const { comparePassword } = require( '../utils/crypto' )

const checkUsersCredentials = async (email, password) => {
    try {
        const user = await findUserByEmail(email)
        console.log(user)
        const verifyPassword = comparePassword( password, user.password )

        return verifyPassword ? user : false
    } catch (error) {
        return false
    }
}

module.exports = checkUsersCredentials