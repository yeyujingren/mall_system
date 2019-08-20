/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-08 10:01:54 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-20 16:46:12
 */
import axios from 'axios';
import { message } from 'antd';
import {
  GET_USER_LIST,
  WILL_CHANGE_INFOR,
  CHANGE_VISIBLE_FLAG
} from '../actionType';
// 获取用户数据
export const getList = (_this) => {
  return (dispacth) => {
    axios.get('/admin/getUserList')
      .then(res => {
        if(res.data.code === 200){
          dispacth({
            type: GET_USER_LIST,
            data: res.data.result
          })
        } else if (res.data.code === 403 ){
          message.info('请使用管理员账号登录！');
          _this.props.history.push('/admin');
        }
      })
      .catch(()=>{
        message.error('获取用户列表数据失败！')
      })
  }
}

// 删除用户账户
export const deleteUser = (user_id,_this) => {
  return (dispatch) => {
    axios.delete('/admin/deleteUser/'+user_id,{
      headers:{
        'contentType':'json',
        'x-csrf-token':window._csrf
      }
    })
      .then(res => {
        if(res.data.code === 200){
          dispatch(getList());
          message.success(res.data.message);
        } else if (res.data.code === 403 ){
          message.info('请使用管理员账号登录！');
          _this.props.history.push('/admin');
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
export const upDateUser = (user_infor,id,flag,_this) => {
  return (dispatch) => {
    axios.put('/admin/upDateUser',{
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
      } else if (res.data.code === 403 ){
        message.info('请使用管理员账号登录！');
        _this.props.history.push('/admin');
      } else {
        message.error(res.data.message);
      }
    })
    .catch(()=>{
      message.error('出现未知错误！');
    })
  }
}
