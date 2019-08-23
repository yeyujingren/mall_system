'use strict';

const Controller = require('egg').Controller;

class CartManageController extends Controller {
  // 更新购物车数据
  async upDateCartList() {
    const {ctx} = this;
    const data = ctx.request.body;
    const result= await ctx.service.shop.cartManageServer.upDateCartList(data);
    if(result){
      ctx.body = {
        'code': 200,
        'message': '购物车数据保存成功！'
      }
    } else {
      ctx.body = {
        'code': 400,
        'message': '购物车数据保存失败！'
      }
    }
  }
}

module.exports = CartManageController;
