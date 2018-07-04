const router = require('koa-router')()
const User = require('../models/user')

// router.prefix('/users')

router.get('/', async (ctx, next) => {
  ctx.body = 'this is a users response!'
})

router.post('/', async (ctx, next) => {
  ctx.body = 'this is a users response!'
})


router.post('/register', async ctx => {
  if (ctx.request.body.username == undefined || ctx.request.body.password == undefined) {
    return ctx.body = {
      status: {
        code: -2,
        msg: '参数为空'
      }
    };
  }

  let name = ctx.request.body.username;
  let password = ctx.request.body.password;

  let u = new User({
    "username": name,
    "password": password
  })

  try {
    let _user = u.saveAsync();

    return ctx.body = {
      status: {
        code: 0,
        msg: 'sucess'
      },
      data: u
    };
  } catch (error) {
    let _user = u.saveAsync()

    return ctx.body = {
      status: {
        code: -1,
        msg: 'error' + error.msg
      }
    };
  }

});


module.exports = router
