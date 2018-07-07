"use strict"

/**
 * Created by auther on July 7th 2018, 1:56:01 pm.
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MongooseDao = require('mongoosedao')
const Promise = require('bluebird')

const userSchema = new Schema(
    {
        "username": "String",
        "password": "String",
        "keys": [
            "username",
            "password"
        ]
    }
)

const User = mongoose.model('User', userSchema)
const UserDao = new MongooseDao(User)

Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)
Promise.promisifyAll(UserDao)

module.exports = UserDao
