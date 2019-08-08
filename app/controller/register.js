/*
 * @Author: Yifeng Tao
 * @Date: 2019-07-30 15:29:02
 * @Last Modified by: 
 * @Last Modified time: 2019-08-08 10:31:37
 */
'use strict';


const Controller = require('egg').Controller;

class RegesterController extends Controller {
  // 用户登录
  async login() {
    const {ctx} = this;
    const userInfor = ctx.request.body;
    const result = await ctx.service.registerServer.login(userInfor);
    ctx.set({
      'contentType':'json'
    });
    if(result.length == 1) {
      // 设置cookie
      let cookie = ctx.cookies.set('EGG_COOK',userInfor.user_name,{
        httpOnly: false,
        encrypt: true,
        maxAge: 1000*60*60*24
      })
      // 设置session
      let session =  ctx.session.user = userInfor.user_name;
      ctx.body = {
        'code': 200,
        'message': '登陆成功！',
        cookie,
        session
      }
    } else {
      ctx.body = {
        'code': 500,
        'message': '登陆失败！'
      }
    }
  }

  // 退出登录
  async logout(){
    const {ctx} = this;
    ctx.session = null;
    ctx.cookies.set('EGG_COOK', null);
    ctx.body = {
      'code': 200,
      'message': '您已经安全退出登录!'
    }
  }
}

module.exports = RegesterController;
