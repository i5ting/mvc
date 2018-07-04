const router = require('koa-router')()
const $ = require('mount-controllers')(__dirname).users_controller;

router.get('/', $.index)

router.post('/register', $.register)

module.exports = router
