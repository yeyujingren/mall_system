'use strict';

const Controller = require('egg').Controller;

class CommonManageController extends Controller {
  async getCourseDetal() {
    const {ctx} = this;
    const id = ctx.params.id;
    const result = await ctx.service.shop.commonManageServer.getCourseDetal(id);
    ctx.body={
      'code': 200,
      'message': '数据查询成功！',
      result
    }
  }
  async getCommentList() {
    const {ctx} = this;
    const id = ctx.params.id;
    const result = await ctx.service.shop.commonManageServer.getCommentList(id);
    ctx.body={
      'code': 200,
      'message': '数据查询成功！',
      result
    }
  }

  async writeCommon() {
    const {ctx} = this;
    const data = ctx.request.body;
    const result = await ctx.service.shop.commonManageServer.writeCommon(data);
    if(result.results.affectedRows === 1){
      ctx.body={
        'code': 200,
        'message': '评论成功！',
        'sum': result.sum
      }
    } else {
      ctx.body={
        'code': 500,
        'message': '数据插入失败！'
      }
    }
  }
}

module.exports = CommonManageController;
