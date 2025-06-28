const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const MongoUri = process.env.Mongo_Uri

const ConnectDb = async() => {
    try {
        const connect = await mongoose.connect(MongoUri)
        console.log("MongoDb Connected");
    } catch (error) {
        console.log("Mongo db not connected")
        process.exit()
    }
}

module.exports = ConnectDb