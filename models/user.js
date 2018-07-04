const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MongooseDao = require('mongoosedao')

const userSchema = new Schema(
    {
        "name": "String",
        "password": "String"
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User