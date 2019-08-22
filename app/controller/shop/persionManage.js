/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-21 17:43:28 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-22 11:00:33
 */

'use strict';

const Controller = require('egg').Controller;

class PersionManageController extends Controller {
  // 修改用户邮箱
  async changeEmail() {
    const { ctx } = this;
    const data = ctx.request.body;
    const result = await ctx.service.shop.persionManageServer.changeEmail(data);
    if(result.affectedRows === 1){
      ctx.body = {
        'code': 200,
        'message': '修改成功！'
      }
    } else {
      ctx.body = {
        'code': 400,
        'message': '修改失败'
      }
    }
  }
  // 修改用户密码
  async changePsd() {
    const { ctx } = this;
    const data = ctx.request.body;
    const result = await ctx.service.shop.persionManageServer.changePsd(data);
    if(result.affectedRows ===  1){
      ctx.session.user = null;
      ctx.cookies.set('EGG_COOK_U', null);
      ctx.body = {
        'code': 200,
        'message': '修改成功！'
      }
    } else {
      ctx.body = {
        'code': 400,
        'message': '修改失败'
      }
    }
  }
  // 获取个人信息
  async getUserInfor () {
    const { ctx } = this;
    const user_name = ctx.cookies.get('EGG_COOK_U',{signed:false,encrypt:true});
    const result = await ctx.service.shop.persionManageServer.getUserInfor(user_name);
    if(result){
      ctx.body = {
        'code': 200,
        'message': '数据获取成功！',
        data:result
      }
    } else {
      ctx.body = {
        'code': 400,
        'message': '数据获取失败！'
      }
    }
  }
  // 修改用户头像
  async pushImg () {
    const { ctx } = this;
    const url = ctx.request.body;
    const user_name = ctx.cookies.get('EGG_COOK_U',{signed:false,encrypt:true});
    const result = await ctx.service.shop.persionManageServer.pushImg(user_name,url);
    if(result.affectedRows === 1){
      ctx.body = {
        'code': 200,
        'message': '用户头像修改成功！'
      }
    } else {
      ctx.body = {
        'code': 400,
        'message': '头像修改失败！'
      }
    }
  }
}

module.exports = PersionManageController;
