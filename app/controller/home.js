'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 加载后台关系系统界面，默认路径'/admin'
  async shop() {
    const { ctx } = this;
    await ctx.render('shop.html');
  }
  // 加载前台商城界面，默认路径'/'
  async admin() {
    const { ctx } = this;
    await ctx.render('platform.html');
  }
}

module.exports = HomeController;
