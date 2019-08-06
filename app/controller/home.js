/*
 * @Author: Yifeng Tao
 * @Date: 2019-07-30 15:29:02
 * @Last Modified by
 * @Last Modified time: 2019-08-06 18:19:18
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 加载前台商城界面，默认路径'/admin'
  async shop() {
    const {ctx} = this;
    await ctx.render('shop.html');
  }
  // 加载前台商城界面，默认路径'/'
  async admin() {
    const { ctx } = this;
    await ctx.render('platform.html');
  }
}

module.exports = HomeController;
