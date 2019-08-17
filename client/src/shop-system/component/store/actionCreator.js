/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-09 09:54:11 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-17 15:40:42
 */
import axios from 'axios';
import { message } from 'antd';
import {HANDLE_MODEL_VISIBLE, GET_VERIFY_CODE, HANDLE_CODE_FLAG, HANDLE_LOGIN, USER_NAME_IS_REPET, UPDATE_MY_CART_LEN} from './actionType';

// 登录注册模态框控制
export const handleModel = (visible,flag) => ({
  type: HANDLE_MODEL_VISIBLE,
  visible,
  flag,
  isRepet: false
})

// 获取验证码
export const getVerify = (flag) => {
  return (dispatch) => {
    axios.get('/verify/'+flag)
      .then( res => {
        dispatch({
          type: GET_VERIFY_CODE,
          verifyCode: res.data
        })
      })
      .catch(() => {
        message.error('获取验证码失败，请稍后再试');
      })
  }
}

// 验证验证码
export const confVerify = (code,flag) => {
  const verifyCode = code.code;
  return (dispatch) => {
    axios.post('/confVerify',{code:verifyCode,flag},{
      headers: {
        'contentType':'json',
        'x-csrf-token':window._csrf
      }
    })
      .then(res => {
        if(res.data.code === 200 ) {
          dispatch({
            type: HANDLE_CODE_FLAG,
            isConf: true
          })
        } else {
          dispatch({
            type: HANDLE_CODE_FLAG,
            isConf: false
          })
        }
      })
  }
}

// 验证注册用户名是否重复
export const verifyUserName = (user_name) => {
  return dispatch => {
    axios.get('/searchName/'+ user_name)
    .then( res => {
      if(res.data.code === 200) {
        dispatch({
          type: USER_NAME_IS_REPET,
          isRepet: false
        })
        message.success('昵称可以用！');
      } else {
        dispatch({
          type: USER_NAME_IS_REPET,
          isRepet: true
        })
        message.error('哎呀，昵称已经被注册了，请再想一个');
      }
    })
    .catch(() => {
      message('出现异常')
    })
  }
}

// 用户注册
export const regest = data => {
  // 封装用户名和用户密码
  const userInfor = {
    'user_name':data.user_name,
    'psd': data.psd,
    'email': data.email,
    'code': data.code
  };
  return (dispatch) => {
    axios.post('/logon',userInfor,{
      headers: {
        'contentType':'json',
        'x-csrf-token': window._csrf
      }
    })
    .then(res => {
      if(res.data.code === 200){
        message.success(res.data.message);
        dispatch(handleModel(false,null));
      } else {
        message.error(res.data.message);
        dispatch(handleModel(true,0));
      }
    })
    .catch(() => {
      message.error('出现未知错误');
    })
  }
}

// 登录
export const login = data => {
  // 封装用户名和用户密码
  const userInfor = {
    'user_name':data.user_name,
    'psd': data.psd,
    'code': data.code
  }
  return (dispatch) => {
    axios.post('/login',userInfor,{
      headers: {
        'contentType':'json',
        'x-csrf-token': window._csrf
      }
    })
    .then(res => {
      if(res.data.code === 200){
        const { user_name, user_photo, user_id } = res.data.data;
        // 在localStorage中存储用户名和用户头像等信息
        localStorage.setItem('user_name',user_name);
        localStorage.setItem('user_photo',user_photo);
        localStorage.setItem('user_id',user_id);
        message.success('欢迎回来，我们已经等候多时^.^');
        dispatch(handleModel(false,null));
        dispatch({
          type: HANDLE_LOGIN,
          isLogin: true
        })
      } else {
        message.error('呀，请仔细检查所填是否有误！');
        dispatch(handleModel(true,1));
      }
    })
    .catch(() => {
      message.error('出现未知错误');
    })
  }
}

// 验证是否登录
export const handleLogin = (isLogin) => ({
  type: HANDLE_LOGIN,
  isLogin: isLogin
})

// 退出登录
export const handleLogout = () => {
  return (dispatch) => {
    axios.get('/logout')
      .then( res => {
        if(res.data.code === 200) {
          // 删除存储在localStorage中的用户信息
          localStorage.removeItem('user_name');
          localStorage.removeItem('user_photo');
          
          dispatch({
            type: HANDLE_LOGIN,
            isLogin: false
          })
          message.success('您已经安全退出了');
        } else {
          message.error('opps,退出失败，请稍等再试');
        }
      })
      .catch(() => {
        message('出现异常')
      })
  }
}

// 获取购物车中课程数量
export const getMycartLen = () => {
  return (dispatch) => {
    const mycart = JSON.parse(localStorage.getItem('mycart'));
    const len = mycart?mycart.length:0;
    dispatch({
      type: UPDATE_MY_CART_LEN,
      mycartLen: len
    })
  }
}

