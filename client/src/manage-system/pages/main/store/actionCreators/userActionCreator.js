/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-08 10:01:54 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-08 10:05:42
 */
import axios from 'axios';
import { message } from 'antd';
import {
  GET_USER_LIST,
  WILL_CHANGE_INFOR,
  CHANGE_VISIBLE_FLAG
} from '../actionType';
export const getList = () => {
  return (dispacth) => {
    axios.get('/getUserList')
      .then(res => {
        if(res.data.code === 200){
          dispacth({
            type: GET_USER_LIST,
            data: res.data.result
          })
        }
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
        if(res.data.code === 200){
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
      if(res.data.code === 200){
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
