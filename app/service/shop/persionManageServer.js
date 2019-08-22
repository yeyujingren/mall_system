/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-21 17:46:12 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-22 10:58:15
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
  async getUserInfor(user_name) {
    const result = await this.app.mysql.get('user',{user_name});
    return result;
  }
  async pushImg(user_name,url){
    const row = {
      user_photo: url.url
    }
    const options = {
      where: {
        user_name: user_name
      }
    }
    const result = await this.app.mysql.update('user',row,options);
    return result;
  }
}

module.exports = PersionManageServerService;
