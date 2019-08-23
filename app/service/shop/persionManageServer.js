/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-21 17:46:12 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-23 09:57:55
 */

'use strict';

const Service = require('egg').Service;
const  crypto = require('crypto');

class PersionManageServerService extends Service {
  // 使用MD5（加盐）
  saltPassword(psd,user_name){
    const saltPassword = psd + ':' + user_name;
    const md5 = crypto.createHash('md5');
    let password = md5.update(saltPassword).digest('hex')
    return password;
  }
  async changeEmail(data) {
    const user_id = data.user_id;
    const psd = data.data.psd;
    const email = data.data.email;
    const user_name = this.ctx.session.user;
    let saltPassword = this.saltPassword(psd,user_name);
    const options = {
      where: {
        user_id,
        psd: saltPassword
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
    const user_name = this.ctx.session.user;
    let oldsaltPassword = this.saltPassword(oldPsd,user_name);
    let newsaltPassword = this.saltPassword(newPsd,user_name);
    const result = await this.app.mysql.query(`update user set psd="${newsaltPassword}" where user_id=${user_id} and psd="${oldsaltPassword}"`);
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
