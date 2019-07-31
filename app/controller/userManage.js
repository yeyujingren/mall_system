/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-30 15:29:02 
 * @Last Modified by: 
 * @Last Modified time: 2019-07-31 10:22:32
 */

'use strict';

const Controller = require('egg').Controller;

class UserManageController extends Controller {
  // 获取会员列表
  async getUserList() {
    const {ctx} = this;
    console.log('获取会员信息：',ctx.request);
    // 获取server中处理所得到的结果
    const result = await ctx.service.userManagerServer.getList();
    ctx.set({
      'contentType': 'json'
    });
    // 设置user列表字段
    ctx.body = {
      'success': true,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }

  // 修改会员信息
  async handleUserStatus() {
    const {ctx} = this;
    // 获取前台传递的用户id以及即将修改的用户状态
    let user_id = ctx.request.body.user_id;
    let user_infor = ctx.request.body.user_infor;
    // 更改用户账户状态
    const result = await ctx.service.userManagerServer.handleStatus(user_id,user_infor);
    // 判断是否修改成功
    const isSuc = result.affectedRows === 1;
    // 设置返回头
    ctx.set({
      'contentType':'json'
    });
    // 设置返回值
    if(isSuc){
      ctx.body = {
        'success': true,
        'message': '修改成功！'
      }
    } else {
      ctx.body = {
        'success': false,
        'message': '修改失败！'
      }
    }
  }

  // 删除会员，采用假删除方式
  async deleteUser() {
    const {ctx} = this;
    // 获取删除用户的id
    let user_id = ctx.request.body.user_id;
    // 获取server中处理的结果
    const result = await ctx.service.userManagerServer.deleteUser(user_id);
    // 判断是否修改成功
    const isSuc = result.affectedRows === 1;
    // 设置返回头
    ctx.set({
      'contentType':'json'
    });
    // 设置返回值
    if(isSuc){
      ctx.body = {
        'success': true,
        'message': '删除成功！'
      }
    } else {
      ctx.body = {
        'success': false,
        'message': '删除失败！'
      }
    }
  }
}

module.exports = UserManageController;

