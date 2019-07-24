'use strict';

const Controller = require('egg').Controller;

class RegesterController extends Controller {
  async login() {
    const {ctx} = this;
    const userInfor = ctx.request.body;
    const result = await ctx.service.registerServer.login(userInfor);
    if(result.length == 1) {
      ctx.set({
        'contentType':'json'
      });
      // 设置登录成功后返回的res字段
      ctx.body = {
        'success': true,
        'message': '登陆成功！'
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
