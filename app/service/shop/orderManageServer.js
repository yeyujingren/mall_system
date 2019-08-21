/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-18 10:14:53 
 * @Last Modified by:    
 * @Last Modified time: 2019-08-21 10:14:53 
 */

'use strict';

const Service = require('egg').Service;

class OrderManageServerService extends Service {
  /**
   * 通过订单id查询订单商品，当支付后商品数量增加
   * @param {number} order_id 订单id
   */
  async addComAmount (order_id){
    const results = await this.app.mysql.select('assocform',{
      where: {order_id},
      columns: 'com_id'
    })
    try {
      await results.map(item => {
        this.app.mysql.query(`update commodity set amount=amount+1 where com_id = ${item.com_id}`);
      })
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 根据用户金额修改用户等级，积分
   * @param {number} user_id : 用户id
   * @param {number} totalPrice : 用户购买金额
   */
  async upDateUserLevel(user_id,totalPrice){
    let level = 0;
    let scoreObj = await this.ctx.app.mysql.select('user',{
      where:{user_id},
      columns: 'integral'
    })
    let score = scoreObj[0].integral;
    score += totalPrice;
    let sum = score;
    for(let i=0;i*100<=sum;i++){
      sum -= i*100;
      level = i;
    }
    level += 1;
    return {level,score};
  }
  /**
   * 向订单-商品关联表插入数据
   * @param {number} orderId:订单id
   * @param {array} data:购物车中的用户数据
   */
  async inserOrder(orderId,data){
    let results = [];
    try {
      for(let i=0;i<data.length;i++){
        let result = await this.ctx.app.mysql.insert('assocform',{
          order_id:orderId,
          com_id: data[i].com_id
        })
        results.push(result);
      }
      return results;
    } catch (error) {
      throw(error);
    }
  }
  /**
   * 根据不同操作进行不同的条件查询
   * @param {number} user_id :用户id
   * @param {number} flag : 标识订单状态操作：0标识查询该用户全部订单，1标识未支付订单，2标识待审核订单，3标识已完成订单，
   */
  select(user_id, flag){
    switch (flag) {
      case 0:
        return `user.user_id=${user_id}`;
      case 1:
        return `user.user_id=${user_id} and orderform.ispay=0`;
      case 2:
        return `user.user_id=${user_id} and orderform.ispay=1`;
      case 3:
        return `user.user_id=${user_id} and orderform.ispay in (2,3)`;
      default:
        return `user.user_id=${user_id} and orderform.ispay=2`;
    }
  }
  /**
   * 生成用户订单
   * @param {object} data :用户传递的订单数据
   */
  async createOrder(data){
    const user_id = data.user_id;
    const cartList = data.cartList;
    const time = new Date();
    const creatTime = time.toLocaleString();
    const orderIdObj = await this.app.mysql.insert('orderform',{
      user_id,
      create_time: creatTime,
      ispay:0
    });
    const orderId = orderIdObj.insertId;
    const results = await this.inserOrder(orderId,cartList);
    return {results,orderId};

  }

  /**
   * 查询订单信息
   * @param {number} user_id 用户id
   * @param {number} flag 标识获取订单种类： 0标识全部，1标识未支付，2标识待审核，3标识已完成
   */
  async getOrderList(user_id, flag) {
    let select = this.select(user_id, flag)
    const result = await this.app.mysql.query(`select 
    orderform.order_id,user.user_name,commodity.com_price,commodity.com_name,commodity.com_photo,commodity.com_id,commodity.type,commodity.course_time,commodity.merchant,orderform.create_time,orderform.ispay
    from user join orderform on user.user_id = orderform.user_id 
    join assocform on orderform.order_id = assocform.order_id 
    join commodity on assocform.com_id = commodity.com_id where ${select}`);
    const data = [];
    result.map((order) => {
      let orderInfo = data.find(item => order.order_id === item.order_id);
      if(!orderInfo) {
        orderInfo = {
          order_id:order.order_id,
          comms: [],
          total_price: 0,
          user_name:'',
          create_time:'',
          ispay: 0
        }
        data.push(orderInfo);
      }
      let com ={};
      com.com_name = order.com_name;
      com.com_price = order.com_price;
      com.com_photo = order.com_photo;
      com.type = order.type;
      com.course_time = order.course_time;
      com.teacher = order.merchant;
      com.com_id = order.com_id;
      orderInfo.comms.push(com);
      orderInfo.total_price += order.com_price;
      orderInfo.user_name = order.user_name;
      orderInfo.create_time = order.create_time;
      orderInfo.ispay = order.ispay;
    })
    return data;
  }
  /**
   * 更新订单状态
   * @param {number} order_id: 订单id
   * @param {number} status: 要更新的状态：1标识支付，3标识取消
   * @param {number} user_id: 用户id
   * @param {number} totalPrice: 购买总金额
   */
  async confirmPay(data){
    const order_id = data.order_id;
    const status = data.status;
    const result = await this.app.mysql.update('orderform',{
      'ispay': status
    },{
      where:{
        order_id
      }
    });
    if(data.user_id && data.totalPrice){
      await this.addComAmount(order_id);
      const rs = await this.upDateUserLevel(data.user_id,data.totalPrice);
      const update = await this.app.mysql.update('user',{
        'vip_level': rs.level,
        'integral': rs.score
      },{
        where:{
          user_id:data.user_id
        }
      })
      if(update.affectedRows === 1) {
        return {
          vip_level: rs.level,
          integral: rs.score,
          result
        };
      }
    }
    return result;
  }
  /**
   * 通过订单id查询订单中包含的商品
   * @param {number} order_id: 订单id
   */
  async hasPay (order_id){
    let hasPayCourse = [];
    let results = await this.ctx.app.mysql.select('assocform',{
      where:{order_id},
      columns: 'com_id'
    })
    results.map(item => {
      hasPayCourse.push(item.com_id);
    })
    return hasPayCourse;
  }
}

module.exports = OrderManageServerService;
