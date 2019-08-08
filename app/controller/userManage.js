/*
 * @Author: Yifeng Tao
 * @Date: 2019-07-30 15:29:02
 * @Last Modified by: 
 * @Last Modified time: 2019-08-08 09:53:49
 */

'use strict';

const Controller = require('egg').Controller;

class UserManageController extends Controller {
  // 获取会员列表
  async getUserList() {
    const {ctx} = this;
    // 获取server中处理所得到的结果
    const result = await ctx.service.userManagerServer.getList();
    ctx.set({
      'contentType': 'json'
    });
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }

  // 修改会员信息
  async handleUserStatus() {
    const {ctx} = this;
    let user_id = ctx.request.body.user_id;
    let user_infor = ctx.request.body.user_infor;
    const result = await ctx.service.userManagerServer.handleStatus(user_id,user_infor);
    // 判断是否修改成功
    const isSuc = result.affectedRows === 1;
    ctx.set({
      'contentType':'json'
    });
    // 设置返回值
    if(isSuc){
      ctx.body = {
        'code': 200,
        'message': '修改成功！'
      }
    } else {
      ctx.body = {
        'code': 500,
        'message': '修改失败！'
      }
    }
  }

  // 删除会员，采用假删除方式
  async deleteUser() {
    const {ctx} = this;
    let user_id = ctx.params.id;
    const result = await ctx.service.userManagerServer.deleteUser(user_id);
    // 判断是否修改成功
    const isSuc = result.affectedRows === 1;
    ctx.set({
      'contentType':'json'
    });
    if(isSuc){
      ctx.body = {
        'code': 200,
        'message': '删除成功！'
      }
    } else {
      ctx.body = {
        'code': 500,
        'message': '删除失败！'
      }
    }
  }
}

module.exports = UserManageController;

