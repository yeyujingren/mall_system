/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-07 16:28:48 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-07 20:02:53
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

  // 修改订单状态
  async handleOrderStatus() {
    const { ctx } = this;
    const order_id = ctx.request.body.order_id;
    const result = await ctx.service.orderManageServer.handleStatus(order_id);
    const isSuc = result.affectedRows === 1;
    ctx.set({
      'contentType':'json'
    });
    if(isSuc){
      ctx.body = {
        'code': 200,
        'message': '订单已支付！'
      }
    } else {
      ctx.body = {
        'code': 500,
        'message': '订单状态修改失败！'
      }
    }
  }
}

module.exports = OrderManageController;
