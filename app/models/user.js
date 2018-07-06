"use strict";

/**
 * Created by alfred on July 6th 2018, 11:01:52 am.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var Promise = require('bluebird');


var userSchema = new Schema(
    {"username":"String","password":"String"}
);

var User = mongoose.model('User', userSchema);
var UserDao = new MongooseDao(User);
 

Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)

Promise.promisifyAll(UserDao)


module.exports = UserDao;