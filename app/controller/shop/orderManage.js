/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-19 20:06:39 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-23 16:41:29
 */

'use strict';

const Controller = require('egg').Controller;

class OrderManageController extends Controller {
  // 订单生成
  async createOrder() {
    let courses = []
    let flag = true;
    const { ctx } = this;
    const data = ctx.request.body;
    const cartList = data.cartList;
    const hasPayCourse = await ctx.service.shop.orderManageServer.getOrderList(data.user_id, 4);
    hasPayCourse.map(item => {
      item.comms.map(course => {
        courses.push(course.com_id);
      })
    })
    for(let i=0;i<courses.length;i++){
      for(let j=0;j<cartList.length;j++){
        if(courses[i]===cartList[j].com_id){
          flag = false;
        }
      }
    }
    if(flag){
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
    } else {
      ctx.body = {
        'code': 406,
        'message': '您的订单中存在已购买课程！'
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
    const data = ctx.request.body;
    const result = await ctx.service.shop.orderManageServer.confirmPay(data);
    const hasPay = await ctx.service.shop.orderManageServer.hasPay(data.order_id);
    const isSuc = result.integral?result.result.affectedRows === 1 && result.integral && result.vip_level:result.affectedRows === 1;
    ctx.set({
      'contentType': 'json'
    });
    if (isSuc) {
      ctx.body = {
        'code': 200,
        'message': '订单已支付！',
        data:{
          integral:result.integral,
          vip_level:result.vip_level,
          hasPay
        }
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
    const result = await ctx.service.shop.orderManageServer.getOrderList(user_id,5);
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }
}

module.exports = OrderManageController;
