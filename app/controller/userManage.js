/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-30 15:29:02 
 * @Last Modified by: 
 * @Last Modified time: 2019-07-30 15:58:28
 */

'use strict';

const Controller = require('egg').Controller;

class UserManageController extends Controller {
  // 获取会员列表
  async getUserList() {
    const {ctx} = this;

    // 获取server中处理所得到的结果
    const result = await ctx.service.userManagerServer.getList();
    console.log('=========',result);
  }
}

module.exports = UserManageController;

