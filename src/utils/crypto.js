const bcrypt = require('bcrypt');

const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 10)
    // return the pasword encrypted 
}

const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
    // return a boolean if the password is correct
}

module.exports = {
    hashPassword,
    comparePassword
}