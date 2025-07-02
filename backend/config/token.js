const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const jwt_secret = process.env.JWT_SECRET;


// generate Token 
const GenerateToken = (id) => {
    const token = jwt.sign({id}, jwt_secret, {
        expiresIn:'30d'
    })
    return token;
}

const DecodeToken = (token) => {
    return jwt.verify(token, jwt_secret)
}



module.exports = {GenerateToken,DecodeToken}
