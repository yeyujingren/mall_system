/*
 * @Author: Yifeng Tao
 * @Date: 2019-07-30 15:28:53
 * @Last Modified by: 
 * @Last Modified time: 2019-07-30 15:32:17
 */

'use strict';

const Service = require('egg').Service;

class UserManagerServerService extends Service {
  // 获取会员列表
   async getList() {
    const results = await this.app.mysql.get('user');
    return results;
  }
}

module.exports = UserManagerServerService;
