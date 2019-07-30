'use strict';

const Controller = require('egg').Controller;

class RegesterController extends Controller {
  async login() {
    const {ctx} = this;
    // 获取登录用户的用户名和密码
    const userInfor = ctx.request.body;

    // 设置cookie
    let cookie = ctx.cookies.set('EGG_COOK',userInfor.user_name, {
      httpOnly: false,
      encrypt: true
    })

    // 设置session
    let session =  ctx.session.user = userInfor.user_name;
    
    const result = await ctx.service.registerServer.login(userInfor);
    // 设置返回头
    ctx.set({
      'contentType':'json'
    });
    if(result.length == 1) {
      // 设置登录成功后返回的res字段
      ctx.body = {
        'success': true,
        'message': '登陆成功！',
        session,
        cookie
      }
    } else {
      // 设置登录失败后返回的res字段
      ctx.body = {
        'success': false,
        'message': '登陆失败！'
      }
    }
  }
}

module.exports = RegesterController;
