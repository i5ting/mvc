const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')

const userSchema = new Schema(
    {
        "username": "String",
        "password": "String"
    }
)

const User = mongoose.model('User', userSchema)

Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)

module.exports = User