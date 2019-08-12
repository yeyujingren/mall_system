/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-08 10:08:21 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-12 13:22:51
 */
import axios from 'axios';
import { message } from 'antd';
import {
  GET_COMM_LIST,
  PUSH_URL,
  CHANGE_VISIBLE_FLAG,
  WILL_CHANGE_INFOR
} from '../actionType';

// 控制模态框展示
export const changeVisible = (flag) => ({
  type: CHANGE_VISIBLE_FLAG,
  visible: flag
})

// 获取要修改的数据
export const willChangeInfor = (infor, id, flag,handlePost) => ({
  type: WILL_CHANGE_INFOR,
  infor: infor,
  user_id: id,
  visible: flag,
  url:null,
  handlePost
})

// 获取商品列表
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
    'amount': data.amount,
    'difficulty': data.difficulty,
    'course_time': data.course_time
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
