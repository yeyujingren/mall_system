/*
 * @Author: Yifeng Tao
 * @Date: 2019-07-30 15:28:53
 * @Last Modified by
 * @Last Modified time: 2019-08-06 18:21:42
 */

'use strict';

const Service = require('egg').Service;

class UserManagerServerService extends Service {
  // 获取会员列表
   async getList() {
    const results = await this.app.mysql.select('user',{
      where:{
        flag:0
      }
    });
    return results;
  }

  // 更改用户账户状态
  async handleStatus(user_id,user_infor) {
    const results = await this.app.mysql.update('user',user_infor,{
      where: {
        user_id
      }
    })
    return results;
  }
  // 假删除用户账户
  async deleteUser(user_id) {
    const result = await this.app.mysql.update('user',{flag:1},{
      where: {
        user_id
      }
    })
    return result
  }
}

module.exports = UserManagerServerService;
