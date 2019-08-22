/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-15 14:17:55 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-22 16:36:36
 */
import axios from 'axios';
import { GET_ORDER_LIST, GET_HAS_PAY_COURSE, GET_COURSE_LIST, GET_FUZZY_SEARCH_LIST } from './actionType';
import { handleLogin } from '../../component/store/actionCreator';
import { message } from 'antd';

// 根据flag来派发不同接口
const seletApi = (user_id,flag) => {
  switch(flag){
    case 0:
      return `/shop/getAllOrder/${user_id}`;
    case 1:
      return `/shop/getWillPayOrder/${user_id}`;
    case 2:
      return `/shop/getWillSendOrder/${user_id}`;
    case 3:
      return `/shop/getHasFinishOrder/${user_id}`;
    default:
      break;
  }
}

// 获取课程数据
export const getCourseList = (type) => {
  return (dispatch) => {
    axios.get('/shop/getCommList/'+type)
      .then( res => {
        if(res.data.code === 200){
          dispatch({
            type:GET_COURSE_LIST,
            data: res.data.result
          })
        }
      })
      .catch(() => {message.error('获取课程列表失败')})
  }
}

// 模糊查询返回值
export const fuzzySearch = (value) => {
  return (dispatch) => {
    axios.get('/shop/fuzzySearch/'+value)
      .then( res => {
        if(res.data.code === 200 ) {
          dispatch({
            type: GET_FUZZY_SEARCH_LIST,
            courseList: res.data.data
          })
        }
      })
      .catch(e => {
        message.error('查询出错！');
      })
  }
}

/**
 * 获取订单列表
 * @param {number} flag : 0标识全部，1标识未支付，2标识待审核，3标识已完成
 */
export const getOrderList = (flag) => {
  // 获取用户id
  const user_id = localStorage.getItem('user_id');
  let api = seletApi(user_id,flag);
  return (dispatch) => {
    axios.get(api)
      .then( res => {
        if(res.data.code === 200){
          dispatch({
            type: GET_ORDER_LIST,
            data: res.data.result
          })
        }
      })
  }
}

// 确认支付
export const reaclPay = (_this,order_id,user_id,totalPrice) => {
  console.log(order_id,user_id,totalPrice);
  return (dispatch) => {
    // 封装body
    const orderInfor = {
      order_id,
      user_id,
      totalPrice,
      'status': 1
    };
    const headers = {
      'contentType':'json',
      'x-csrf-token': window._csrf
    };
    axios.put('/shop/confirmPay',orderInfor,{headers})
      .then( res => {
        if(res.data.code === 200 ){
          let hasPay = JSON.parse(localStorage.getItem('hasPay'));
          localStorage.setItem('integral',res.data.data.integral);
          localStorage.setItem('vip_level',res.data.data.vip_level);
          res.data.data.hasPay.map(item => {
            hasPay.push(item)
          });
          localStorage.setItem('hasPay',JSON.stringify(hasPay));
          _this.props.history.push('/success');
        } else if (res.data.code === 403 ){
          message.info('您的账号已被冻结，请联系管理员解冻，再进行支付操作！');
        } else {
          _this.props.history.push('/fail');
        }
      })
  }
}

// 取消订单
export const reaclCancel = (_this,order_id) => {
  return (dispatch) => {
    // 封装body
    const orderInfor = {
      'order_id': order_id,
      'status': 3
    };
    const headers = {
      'contentType':'json',
      'x-csrf-token': window._csrf
    };
    axios.put('/shop/confirmCancel',orderInfor,{headers})
      .then( res => {
        if(res.data.code === 200 ){
          message.success('您已经成功取消订单！');
          _this.props.history.push('/');
        } else if (res.data.code === 403 ){
          message.info('您的账号已被冻结，请联系管理员解冻，再进行取消订单操作！');
        } else {
          message.error('取消订单失败，请稍后重试！');
        }
      })
      .catch(()=>message.error('取消失败，请检查您的网络是否连接！'))
  }
}

// 获取用户已购课程列表
export const getHasPayList = user_id => {
  return (dispatch) => {
    axios.get('/shop/getHasPayCourse/'+user_id)
      .then(res => {
        if(res.data.code === 200) {
          dispatch({
            type: GET_HAS_PAY_COURSE,
            data: res.data.result
          })
        }
      })
  }
}

// 修改密码或者邮箱
// 0标识邮箱，1标识密码
export const changePersionInfor = (flag,values,id,_this) => {
  // 封装body
  const data = {
    'user_id': id,
    'data': values
  };
  console.log(data)
  const headers = {
    'contentType':'json',
    'x-csrf-token': window._csrf
  };
  if(!flag){
    return (dispatch) => {
      axios.put('/shop/changeEmail',data,{headers})
        .then( res => {
          if(res.data.code === 200 ){
            message.success('您已经成功修改电子邮箱！');
          } else if (res.data.code === 403 ){
            message.info('您的账号已被冻结，请联系管理员解冻，修改邮箱操作');
          } else {
            message.error('邮箱修改失败，请稍后重试！');
          }
        })
        .catch(()=>message.error('修改失败，请检查您的网络是否连接！'))
    }
  }
  return (dispatch) => {
    axios.put('/shop/changePsd',data,{headers})
      .then( res => {
        if(res.data.code === 200 ){
          localStorage.clear()
          message.success('您已经成功修改密码，请重新登录！');
          dispatch(handleLogin(false));
          _this.props.history.push('/');
        } else if (res.data.code === 403 ){
          message.info('您的账号已被冻结，请联系管理员解冻，再进行修改密码操作！');
        } else {
          message.error('修改密码失败，请稍后重试！');
        }
      })
      .catch(()=>message.error('修改密码失败，请检查您的网络是否连接！'))
  }
}

