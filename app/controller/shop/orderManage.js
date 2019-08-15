'use strict';

const Controller = require('egg').Controller;

class OrderManageController extends Controller {
  // 获取所有订单
  async getAllOrder() {
    const {ctx} = this;
    const user_id = ctx.params.id;
    const result = await ctx.service.shop.orderManageServer.getOrderList(user_id,0);
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }
  // 获取未支付订单
  async getWillPayOrder() {
    const {ctx} = this;
    const user_id = ctx.params.id;
    const result = await ctx.service.shop.orderManageServer.getOrderList(user_id,1);
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }

  // 获取未支付订单
  async getWillSendOrder() {
    const {ctx} = this;
    const user_id = ctx.params.id;
    const result = await ctx.service.shop.orderManageServer.getOrderList(user_id,2);
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }

  // 获取未支付订单
  async getHasFinishOrder() {
    const {ctx} = this;
    const user_id = ctx.params.id;
    const result = await ctx.service.shop.orderManageServer.getOrderList(user_id,3);
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }

}

module.exports = OrderManageController;
