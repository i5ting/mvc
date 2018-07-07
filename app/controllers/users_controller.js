"use strict";

/**
 * Created by Moajs on July 6th 2018, 11:01:52 am.
 */

var $models = require('mount-models')(__dirname);
var User = $models.user;

exports.list = async (ctx, next) => {
  console.log(ctx.method + ' /users => list, query: ' + JSON.stringify(ctx.query));
  try {
    let users = await User.getAllAsync();
    
    await ctx.render('users/index', {
      users : users
    })
  } catch (err) {
    return ctx.api_error(err);
  }
};

exports.new = async (ctx, next) => {
  console.log(ctx.method + ' /users/new => new, query: ' + JSON.stringify(ctx.query));
  
  await ctx.render('users/new', {
    user : {
      "_action" : "new"
    }
  });
};

exports.show = async (ctx, next) => {
  console.log(ctx.method + ' /users/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
    
  // try {
    let id = ctx.params.id;
    let user = await User.getByIdAsync(id);
    // user.keys = User.model._keys;
    // console.log(user.model.__keys);
  
    await ctx.render('users/show', {
      user : user
    });
  // } catch (err) {
  //   console.dir(err)
  //   return ctx.api_error(err);
  // }
};

exports.edit = async (ctx, next) => {
  console.log(ctx.method + ' /users/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  // try {
    let id = ctx.params.id;

    let user = await User.getByIdAsync(id);
  
    console.log(user);
    user._action = 'edit';

    await ctx.render('users/edit', {
      user : user
    });
  // } catch (err) {
  //   return ctx.api_error(err);
  // }
};

exports.create = async (ctx, next) => {
  console.log(ctx.method + ' /users => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  try {
    let user = await User.createAsync({username: ctx.request.body.username,password: ctx.request.body.password});
  
    console.log(user);
    await ctx.render('users/show', {
      user : user
    });
  } catch (err) {
    return ctx.api_error(err);
  }
};

exports.update = async (ctx, next) => {
  console.log(ctx.method + ' /users/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  try {
    let id = ctx.params.id;

    let user = await User.updateByIdAsync(id,{username: ctx.request.body.username,password: ctx.request.body.password});
  
    ctx.body = ({
      data:{
        redirect : '/users/' + id
      },
      status:{
        code : 0,
        msg  : 'delete success!'
      }
    });
  } catch (err) {
    return ctx.api_error(err);
  }
};

exports.destroy = async (ctx, next) => {
  console.log(ctx.method + ' /users/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
    
  try {
    let id = ctx.params.id;
  
    await User.deleteByIdAsync(id);
  
    ctx.body = ({
      data:{},
      status:{
        code : 0,
        msg  : 'delete success!'
      }
    });
  } catch (err) {
    return ctx.api_error(err);
  }
};

// -- custom

// -- custom api
exports.api = {
  list: async (ctx, next) => {
    try {
      let api_user_id = ctx.api_user.id;

      let users = await User.queryAsync({});
      console.log(users)
      await ctx.api({
        users : users
      })
    } catch (err) {
      return ctx.api_error(err);
    }
  },
  show: async (ctx, next) => {
    try {
      let api_user_id = ctx.api_user.id;
      let id = ctx.params.user_id;

      let user = await User.getByIdAsync(id);
    
      await ctx.api({
        user : user
      });
    } catch (err) {
      return ctx.api_error(err);
    }
  },
  create: async (ctx, next) => {
    try {
      let api_user_id = ctx.api_user.id;

      let user = await User.createAsync({username: ctx.request.body.username,password: ctx.request.body.password});
    
      ctx.body = ({
        user : user
      });
    } catch (err) {
      return ctx.api_error(err);
    }
  },
  update: async (ctx, next) => {
    try {
      let api_user_id = ctx.api_user.id;
      let id = ctx.params.user_id;
    
      let user = await User.updateByIdAsync(id, {username: ctx.request.body.username,password: ctx.request.body.password});
    
      await ctx.api({
        user : user,
        redirect : '/users/' + id
      });
    } catch (err) {
      return ctx.api_error(err);
    }
  },
  delete: async (ctx, next) => {
    try {
      let api_user_id = ctx.api_user.id;
      let id = ctx.params.user_id;

      await User.deleteByIdAsync(id);
    
      await ctx.api({id: id});
    } catch (err) {
      return ctx.api_error(err);
    }
  }
}
