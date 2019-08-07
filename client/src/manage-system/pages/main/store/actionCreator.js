/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 11:41:45 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-07 20:05:40
 */
import axios from 'axios';
import { message } from 'antd';
import {
  GET_USER_LIST,
  WILL_CHANGE_INFOR,
  CHANGE_VISIBLE_FLAG,
  GET_COMM_LIST,
  PUSH_URL,
  GET_ORDER_LIST
} from './actionType'

/**=============== 会员管理Begin ============= */
// 退出登录
export const logout = () => {
  return () => {
    axios.get('/logout')
      .then(res => {
        if(res.data.success){
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch(()=>{
        message.error('出现未知错误！');
      })
  }
}

// 获取会员信息列表
export const getList = () => {
  return (dispacth) => {
    axios.get('/getUserList')
      .then(res => {
        dispacth({
          type: GET_USER_LIST,
          data: res.data.result
        })
      })
      .catch(()=>{
        message.error('获取用户列表数据失败！')
      })
  }
}

// 删除用户账户
export const deleteUser = (user_id) => {
  return (dispatch) => {
    axios.delete('/deleteUser/'+user_id,{
      headers:{
        'contentType':'json',
        'x-csrf-token':window._csrf
      }
    })
      .then(res => {
        if(res.data.success){
          dispatch(getList());
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch(()=>{
        message.error('出现未知错误！');
      })
  }
}

// 获取要修改的数据
export const willChangeInfor = (infor, id, flag,handlePost) => ({
  type: WILL_CHANGE_INFOR,
  infor: infor,
  user_id: id,
  visible: flag,
  url:null,
  handlePost
})
// 控制模态框是否显示
export const changeVisible = (flag) => ({
  type: CHANGE_VISIBLE_FLAG,
  visible: flag
})
// 更新数据
export const upDateUser = (user_infor,id,flag) => {
  return (dispatch) => {
    axios.put('/upDateUser',{
        user_id:id,
        user_infor:user_infor
      },{
        headers:{
          'contentType':'json',
          'x-csrf-token':window._csrf
        }
    })
    .then(res => {
      if(res.data.success){
        dispatch(getList());
        dispatch(changeVisible(flag));
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    })
    .catch(()=>{
      message.error('出现未知错误！');
    })
  }
}
/**=============== 会员管理End ============= */

/**=============== 商品管理begin ============= */
// 获取商品列表数据
export const getCommList = () => {
  return (dispatch) => {
    axios.get('/getCommList')
      .then( res => {
        if(res.data.code ==200){
          dispatch({
            type: GET_COMM_LIST,
            data: res.data.result
          })
        } else {
          message.error(res.data.message);
        }
      })
      .catch(()=>{
        message.error('网络不可用！');
      })
  }
}
// 删除商品数据
export const deleteComm = (com_id) => {
  return dispatch => {
    axios.delete('/deleteComm/'+com_id ,{
      headers:{
        'contentType':'json',
        'x-csrf-token':window._csrf
      }
    })
      .then(res => {
        if(res.data.code == 200) {
          message.success(res.data.message);
          dispatch(getCommList());
        } else {
          message.error(res.data.message);
        }
      })
      .catch(()=>{
        message.error('网络连接失败')
      })
  }
}
// 将上传成功的图片的路径保存在state中
export const pushUrl = url => ({
  type: PUSH_URL,
  url: url
})
 /**
  * 更新数据
  * @param {object} data 要更新或者增加的数据
  * @param {number} id 更新的id
  * @param {string} url 需要更新的url
  * @param {boolean} flag 控制模态框是否显示
  * @param {number}handlePost: 标识请求类型，1代表商品修改请求，2代表商品增加请求
  */
export const upDateComm = (data,id,url,flag, handlePost) => {
  let comm_infor = {
    'com_name': data.com_name,
    'merchant': data.merchant,
    'integral': data.integral,
    'com_price': data.com_price,
    'com_dec': data.com_dec,
    'amount': data.amount
  }
  // 判断不同的标识来分发不同的请求
  const posturl = () => {
    if(handlePost == 1) {
      return '/upDateComm'
    } else {
      return '/addComm'
    }
  }
  // 判断不同的标识来确定是在请求body中添加com_id字段
  const willPushData = () => {
    if(handlePost == 1) {
      return {
        com_id:id,
        comm_infor:comm_infor
      }
    } else {
      return {
        comm_infor
      }
    }
  }
  // 判断url是否为空，若为空则表示没有修改图片，否则为修改图片
  if(url){
    let key = 'com_photo';
    let value = url;
    comm_infor[key] = value;
  }
  return (dispatch) => {
    axios.post(posturl(),willPushData(),{
        headers:{
          'contentType':'json',
          'x-csrf-token':window._csrf
        }
    })
    .then(res => {
      if(res.data.code == 200) {
        message.success(res.data.message);
        dispatch(changeVisible(flag));
        dispatch(getCommList());
      } else {
        message.error(res.data.message);
      }
    })
    .catch(()=>{
      message.error('网络连接失败')
    })
  }
}
/**=============== 商品管理End ============= */

/**=============== 订单管理Begin ============= */
// 获取订单列表数据
export const getOrderList = () => {
  return (dispatch) => {
    axios.get('/getOrderList')
      .then( res => {
        if(res.data.code ==200){
          dispatch({
            type: GET_ORDER_LIST,
            data: res.data.result
          })
        } else {
          message.error(res.data.message);
        }
      })
      .catch(()=>{
        message.error('网络不可用！');
      })
  }
}
// 更新订单状态
export const comfirmPay = (order_id) => {
  return (dispatch) => {
    axios.put('/upDateOrderStatus',{'order_id':order_id},{
      headers:{
        'contentType':'json',
        'x-csrf-token':window._csrf
      }
    })
      .then( res => {
        if(res.data.code ==200){
          dispatch(getOrderList())
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch(()=>{
        message.error('网络不可用！');
      })
  }
}
