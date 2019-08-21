/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-21 17:46:12 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-21 18:55:04
 */

'use strict';

const Service = require('egg').Service;

class PersionManageServerService extends Service {
  async changeEmail(data) {
    const user_id = data.user_id;
    const psd = data.data.psd;
    const email = data.data.email;
    const options = {
      where: {
        user_id,
        psd
      }
    }
    const row = {
      email
    }

    const result = await this.app.mysql.update('user',row,options);
    return result;
  }
  async changePsd(data) {
    const user_id = data.user_id;
    const newPsd = data.data.newPsd;
    const oldPsd = data.data.oldPsd;
    const result = await this.app.mysql.query(`update user set psd=${newPsd} where user_id=${user_id} and psd=${oldPsd}`);
    return result;
  }
}

module.exports = PersionManageServerService;
