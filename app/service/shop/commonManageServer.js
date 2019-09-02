'use strict';

const Service = require('egg').Service;

class CommonManageServerService extends Service {
  async getCourseDetal(id) {
    const result = await this.app.mysql.query(`select * from commodity where com_id=${id}`);
    const sum = await this.app.mysql.query(`select COUNT(*) as sum from commentform where com_id=${id}`);
    return {result:result[0],sum:sum[0].sum}
  }
  async getCommentList(id) {
    // 数目统计sql： SELECT COUNT(*) FROM commentform where com_id=${id}
    const results = await this.app.mysql.query(`select user.user_name,commentform.comment_id,user.user_photo,commentform.create_time,commentform.comment_value from user join commentform on user.user_id = commentform.user_id where com_id=${id}`);
    return results;
  }

  async writeCommon(data) {
    const time = new Date();
    const createTime = time.toLocaleString();
    const results = await this.app.mysql.insert('commentform',{
      user_id: data.user_id,
      com_id: data.com_id,
      create_time:createTime,
      comment_value: data.comment_value
    });
    const sum = await this.app.mysql.query(`select COUNT(*) as sum from commentform where com_id=${data.com_id}`);
    return {results,sum:sum[0].sum}
  }
}

module.exports = CommonManageServerService;
