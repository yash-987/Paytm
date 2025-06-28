const bcrypt = require('bcryptjs')

const hashPassword = async(password) => {
    const salt =  bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password,salt)
    
}


const matchPassword = async (pass, hashedPass) => {
    return bcrypt.compareSync(pass,hashedPass)
}

module.exports = {hashPassword,matchPassword}