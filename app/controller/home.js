'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 加载后台关系系统界面，默认路径'/admin'
  async shop() {

    // 测试数据
    const testData = {
      'user_name': 'test5',
      'email': 'test@outlook.com',
      'psd': 'test'
    }
    
    const { ctx } = this;
    const result = await ctx.service.registerServer.logon(testData.user_name, testData.psd, testData.email);
    if ( result.user.affectedRows === 1 ) {
      ctx.body = '插入成功！'
    } else {
      ctx.body = '插入失败！'
    }
    // ctx.body = user;
    // await ctx.render('shop.html');
  }
  // 加载前台商城界面，默认路径'/'
  async admin() {
    const { ctx } = this;
    await ctx.render('platform.html');
  }
}

module.exports = HomeController;
