'use strict';

const Service = require('egg').Service;

class LogonService extends Service {
  async logon(userId) {
    const user = await this.app.mysql.get('user',{ userId });
    return { user };
  }
}

module.exports = LogonService;
