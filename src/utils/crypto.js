const bcrypt = require('bcrypt')

const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 10)
}

const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

// const hashedPass = hashPassword('root')
// console.log(hashedPass)
// console.log(comparePassword('root', '$2b$10$VlQ3/0Py41y2NHUMwSTvmuBtsftTYxhhM3TlGNoauUnKTOuOyVTAW'))

module.exports = {
    hashPassword,
    comparePassword
}