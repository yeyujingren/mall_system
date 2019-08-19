'use strict';

const Controller = require('egg').Controller;

class OrderManageController extends Controller {
  // 订单生成
  async createOrder() {
    const { ctx } = this;
    const data = ctx.request.body;
    const result = await ctx.service.shop.orderManageServer.createOrder(data);
    if(result.results.length === data.cartList.length){
      ctx.body = {
        'code': 200,
        'message': '订单生成成功！',
        'order_id':result.orderId
      }
    } else {
      ctx.body = {
        'code': 400,
        'message': '订单生成失败，请重试！'
      }
    }
  }

  // 获取所有订单
  async getAllOrder() {
    const { ctx } = this;
    const user_id = ctx.params.id;
    const result = await ctx.service.shop.orderManageServer.getOrderList(user_id, 0);
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }
  // 获取未支付订单
  async getWillPayOrder() {
    const { ctx } = this;
    const user_id = ctx.params.id;
    const result = await ctx.service.shop.orderManageServer.getOrderList(user_id, 1);
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }

  // 获取未支付订单
  async getWillSendOrder() {
    const { ctx } = this;
    const user_id = ctx.params.id;
    const result = await ctx.service.shop.orderManageServer.getOrderList(user_id, 2);
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }

  // 获取未支付订单
  async getHasFinishOrder() {
    const { ctx } = this;
    const user_id = ctx.params.id;
    const result = await ctx.service.shop.orderManageServer.getOrderList(user_id, 3);
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }

  // 确认支付订单
  async confirmPay() {
    const { ctx } = this;
    const order_id = ctx.request.body.order_id;
    const status = ctx.request.body.status;
    const result = await ctx.service.shop.orderManageServer.confirmPay(order_id, status);
    const isSuc = result.affectedRows === 1;
    ctx.set({
      'contentType': 'json'
    });
    if (isSuc) {
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

  // 已购课程获取
  async getHasPayCourse() {
    const { ctx } = this;
    const user_id = ctx.params.id;
    const result = await ctx.service.shop.orderManageServer.getOrderList(user_id,4);
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }
}

module.exports = OrderManageController;
