/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-07 16:28:48 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-07 18:07:48
 */

'use strict';

const Controller = require('egg').Controller;

class OrderManageController extends Controller {
  // 获取订单列表
  async getOrderList() {
    const { ctx } = this;
    const result = await ctx.service.orderManageServer.getList();
    ctx.set({
      'contentType':'json'
    });
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }
}

module.exports = OrderManageController;
