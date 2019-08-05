/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-02 16:52:13 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-05 15:41:47
 */
'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const awaitWritrStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class CommManageServerService extends Service {
  // 查询商品
  async getList() {
    const results = await this.app.mysql.query('select * from commodity where flag=0')
    return results;
  }

  // 增加商品
  async addComm(data) {
    const result = await this.app.mysql.insert('commodity',data);
    return result;
  }

  // 删除商品
  async deleteComm(com_id) {
    const result = await this.app.mysql.update('commodity',{flag:1},{
      where: {
        com_id
      }
    })
    return result;
  }
  // 修改商品
  async changeComm(data,com_id){
    console.log('===++++++++++++===',data)
    const result = await this.app.mysql.update('commodity',data,{
      where: {
        com_id
      }
    });
    return result;
  }
  // 上传图片
  async upload() {
    const {ctx} = this;
    const stream = await ctx.getFileStream();
    const filename = Math.random().toString(36).substr(2)
      + new Date().getTime()
      + path.extname(stream.filename).toLocaleLowerCase();
    const target = path.join(this.config.baseDir,'app/public/images',filename);
    const wirteStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      awaitWritrStream(stream.pipe(wirteStream));
    } catch (err) {
        // 如果出现错误，关闭管道
        await sendToWormhole(stream);
        throw err;
    }
    return filename;
  }
}

module.exports = CommManageServerService;
