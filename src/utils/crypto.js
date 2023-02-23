const bcypt=require('bcrypt')

//! return el password encriptado 10 veces
const hashPassword = (plainPassword) => {
    return bcypt.hashSync(plainPassword, 10)
}
//! return a boolean si contraseña plana es igual a hashpassword(pass encriptado)
const comparePassword = (plainPassword, hashedPassword) => {
    return bcypt.compareSync(plainPassword, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}