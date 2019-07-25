'use strict';

const Controller = require('egg').Controller;

class RegesterController extends Controller {
  async login() {
    const {ctx} = this;
    // 获取登录用户的用户名和密码
    const userInfor = ctx.request.body;

    // 设置cookie
    let count =  ctx.cookies.set('EGG_COOKIE',userInfor.user_name,{
      maxAge: 24* 3600* 1000,
      httpOnly: false,
      encrypt:true
    });

    const result = await ctx.service.registerServer.login(userInfor);
    if(result.length == 1) {
      ctx.set({
        'contentType':'json'
      });
      // 设置登录成功后返回的res字段
      ctx.body = {
        'success': true,
        'message': '登陆成功！',
        count
      }
    } else {
      ctx.set({
        'contentType':'json'
      });
      // 设置登录失败后返回的res字段
      ctx.body = {
        'success': false,
        'message': '登陆失败！'
      }
    }
  }
}

module.exports = RegesterController;
