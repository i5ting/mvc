import test from 'ava'

// 1、引入`mongoose connect`
require('../../db')

// 2、引入`User` Model
const User = require('../../models/user')

// 3、定义`user` Entity
let user = new User({
    username: 'i5ting',
    password: '0123456789'
})

test('User.save()', async t => {
    let u = await user.saveAsync()

    t.is(u.username, 'i5ting')
})