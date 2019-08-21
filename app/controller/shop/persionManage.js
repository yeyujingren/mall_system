/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-21 17:43:28 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-21 18:57:51
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
}

module.exports = PersionManageController;
