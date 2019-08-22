/*
 * @Author: Yifeng Tao
 * @Date: 2019-08-02 16:42:17
 * @Last Modified by: 
 * @Last Modified time: 2019-08-22 16:28:06
 */
'use strict';

const Controller = require('egg').Controller;

class CommManageController extends Controller {
  // 获取商品列表
  async getCommList() {
    const {ctx} = this;
    const type = ctx.params.type;
    const result = await ctx.service.admin.commManageServer.getList(type);
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

  // 增加商品
  async addComm () {
    const {ctx} = this;
    const data = ctx.request.body;
    const result = await ctx.service.admin.commManageServer.addComm(data);
    // 判断是否修改成功
    const isSuc = result.affectedRows === 1;
    ctx.set({
      'contentType':'json'
    });
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
    const com_id = ctx.params.id;
    const result = await this.ctx.service.admin.commManageServer.deleteComm(com_id);
    // 判断是否删除成功
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
  // 修改商品信息
  async changeComm() {
    const {ctx} = this;
    const data = ctx.request.body.comm_infor;
    const com_id = ctx.request.body.com_id;
    const result = await ctx.service.admin.commManageServer.changeComm(data,com_id)
    // 判断是否修改成功
    const isSuc = result.affectedRows === 1;
    ctx.set({
      'contentType':'json'
    });
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

  // 上传图片
  async upload () {
    const {ctx} = this;
    const result =  await ctx.service.admin.commManageServer.upload()
    ctx.set({
      'contentType':'json'
    });
    ctx.body = {
      'code': 200,
      'url': '/images/'+result
    }
  }
  // 模糊查询课程
  async fuzzySearch() {
    const {ctx} = this;
    const key = ctx.params.key;
    const result =  await ctx.service.admin.commManageServer.fuzzySearch(key);
    ctx.set({
      'contentType':'json'
    });
    ctx.body = {
      'code': 200,
      'data': result
    }
  }
}

module.exports = CommManageController;
