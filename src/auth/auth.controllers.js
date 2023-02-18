const {findUserByEmail}=require('../users/users.controllers')
const {comparePassword}=require('../utils/crypto')

const checkUsersCredentials = async (email, password) => {
    try {
        const user= await findUserByEmail(email)  //obtengo los datos del userio dentro del login
        const feryfyPassword =comparePassword(password, user.password)  //authenticared password
        if (feryfyPassword) {
            return user
        }else{
            return false
        }
    } catch (error) {
        return false
    }

}

module.exports = checkUsersCredentials