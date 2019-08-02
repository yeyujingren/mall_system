/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-02 16:52:13 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-02 19:55:57
 */
'use strict';

const Service = require('egg').Service;

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
}

module.exports = CommManageServerService;
