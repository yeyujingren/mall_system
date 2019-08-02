/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-02 16:42:17 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-02 19:56:36
 */
'use strict';

// console.log('获取商品信息：')

const Controller = require('egg').Controller;

class CommManageController extends Controller {
  // 获取商品列表
  async getCommList() {
    const {ctx} = this;
    // 获取server中处理的数据
    const result = await ctx.service.commManageServer.getList();
    ctx.set({
      'contentType':'json'
    });
    // 设置user列表字段
    ctx.body = {
      'code': 200,
      'message': '数据获取成功！',
      'len': result.length,
      result
    }
  }

  // 增加商品
  async addComm () {
    const {ctx} = this;
    const data = ctx.request.body;
    const result = await ctx.service.commManageServer.addComm(data);
    // 判断是否修改成功
    const isSuc = result.affectedRows === 1;
    // 设置返回头
    ctx.set({
      'contentType':'json'
    });
    // 设置返回值
    if(isSuc){
      ctx.body = {
        'code': 200,
        'message': '添加成功！'
      }
    } else {
      ctx.body = {
        'code': 500,
        'message': '添加失败！'
      }
    }
  }

  // 删除商品
  async deleteComm (){
    const {ctx} = this;
    const com_id = ctx.request.body.com_id
    const result = await this.ctx.service.commManageServer.deleteComm(com_id);
    // 判断是否删除成功
    const isSuc = result.affectedRows === 1;
    // 设置返回头
    ctx.set({
      'contentType':'json'
    });
    // 设置返回值
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
  // 修改商品信息
  async changeComm() {
    const {ctx} = this;
    const data = ctx.request.body.data;
    const com_id = ctx.request.body.com_id;
    console.log('============',data,com_id)
    const result = await ctx.service.commManageServer.changeComm(data,com_id)
    // 判断是否修改成功
    const isSuc = result.affectedRows === 1;
    // 设置返回头
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
}

module.exports = CommManageController;
