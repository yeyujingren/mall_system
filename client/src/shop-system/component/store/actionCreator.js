/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-09 09:54:11 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-23 18:02:48
 */
import axios from 'axios';
import { message } from 'antd';
import {
  HANDLE_MODEL_VISIBLE,
  GET_VERIFY_CODE,
  HANDLE_CODE_FLAG,
  HANDLE_LOGIN,
  USER_NAME_IS_REPET,
  UPDATE_MY_CART_LEN,
  GET_CART_LIST,
  GET_USER_INFO,
  PUSH_PERSION_PHOTO
} from './actionType';

// 登录注册模态框控制
export const handleModel = (visible, flag) => ({
  type: HANDLE_MODEL_VISIBLE,
  visible,
  flag,
  isRepet: false
})

// 获取购物车中数据列表
export const getCartList = () => {
  let totalPrice = 0;
  const mycart = JSON.parse(localStorage.getItem('mycart')) ? JSON.parse(localStorage.getItem('mycart')) : [];
  if (mycart) {
    for (let i = 0; i < mycart.length; i++) {
      totalPrice += mycart[i].com_price;
    }
  }
  return (dispatch) => {
    dispatch({
      type: GET_CART_LIST,
      mycartList: mycart,
      totalPrice
    })
  }
}

// 获取购物车中课程数量
export const getMycartLen = () => {
  return (dispatch) => {
    const mycart = JSON.parse(localStorage.getItem('mycart'));
    const len = mycart ? mycart.length : 0;
    dispatch({
      type: UPDATE_MY_CART_LEN,
      mycartLen: len
    })
  }
}

// 获取验证码
export const getVerify = (flag) => {
  return (dispatch) => {
    axios.get('/verify/' + flag)
      .then(res => {
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
export const confVerify = (code, flag) => {
  const verifyCode = code.code;
  return (dispatch) => {
    axios.post('/confVerify', { code: verifyCode, flag }, {
      headers: {
        'contentType': 'json',
        'x-csrf-token': window._csrf
      }
    })
      .then(res => {
        if (res.data.code === 200) {
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
    axios.get('/searchName/' + user_name)
      .then(res => {
        if (res.data.code === 200) {
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
    'user_name': data.user_name,
    'psd': data.psd,
    'email': data.email,
    'code': data.code
  };
  return (dispatch) => {
    axios.post('/logon', userInfor, {
      headers: {
        'contentType': 'json',
        'x-csrf-token': window._csrf
      }
    })
      .then(res => {
        if (res.data.code === 200) {
          message.success(res.data.message);
          dispatch(handleModel(false, null));
        } else {
          message.error(res.data.message);
          dispatch(handleModel(true, 0));
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
    'user_name': data.user_name,
    'psd': data.psd,
    'code': data.code
  }
  return (dispatch) => {
    axios.post('/login', userInfor, {
      headers: {
        'contentType': 'json',
        'x-csrf-token': window._csrf
      }
    })
      .then(res => {
        if (res.data.code === 200) {
          const { user_name, user_photo, user_id, vip_level, integral } = res.data.data.result;
          const courses = res.data.data.courses;
          // 在localStorage中存储用户名和用户头像等信息
          localStorage.setItem('user_name', user_name);
          localStorage.setItem('user_photo', user_photo);
          localStorage.setItem('user_id', user_id);
          localStorage.setItem('vip_level', vip_level);
          localStorage.setItem('integral', integral);
          localStorage.setItem('hasPay', JSON.stringify(courses));
          localStorage.setItem('mycart',JSON.stringify(res.data.data.mycartList));
          message.success('欢迎回来，我们已经等候多时^.^');
          dispatch(handleModel(false, null));
          dispatch({
            type: HANDLE_LOGIN,
            isLogin: true
          })
          dispatch(getCartList());
          dispatch(getMycartLen());
        } else {
          message.error('呀，请仔细检查所填是否有误！');
          dispatch(handleModel(true, 1));
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
  return dispatch => {
    axios.get('/logout/0')
    .then(res => {
      if (res.data.code === 200) {
        // 删除存储在localStorage中的用户信息
        localStorage.clear();
        dispatch({
          type: HANDLE_LOGIN,
          isLogin: false
        })
        dispatch(getMycartLen())
        message.success('您已经安全退出了');
      } else {
        message.error('opps,退出失败，请稍等再试');
      }
    })
    .catch(() => {
      message.error('出现异常');
    })
  }
}

// 清除localStorage,并更新购物车列表和购物车数量
export const removeMyCart = () => {
  return dispatch => {
    const mycart = JSON.stringify([]);
    localStorage.setItem('mycart',mycart);
    dispatch(getCartList());
    dispatch(getMycartLen());
  }
}

// 购物车点击删除后删除相应课程
export const delCourse = (com_id) => {
  const mycart = JSON.parse(localStorage.getItem('mycart'));
  return (dispatch) => {
    mycart.splice(mycart.findIndex(item => item.com_id === com_id), 1);
    localStorage.setItem('mycart', JSON.stringify(mycart));
    dispatch(getMycartLen());
    dispatch(getCartList());
  }
}

// 获取用户信息
export const getUserInfor = () => {
  return dispatch => {
    axios.get('/shop/getUserInfor')
      .then(res => {
        if (res.data.code === 200) {
          dispatch({
            type: GET_USER_INFO,
            userInfor: res.data.data
          })
        } else if (res.data.code === 403) {
          message.info('您的账号已经冻结，请联系管理员解冻')
        } else {
          message.error('数据请求失败，请稍后重试！')
        }
      })
      .catch(e => {
        message.error('网络请求失败，请示后重试！')
      })
  }
}

// 上传用户头像
export const pushImg = url => {
  return dispatch => {
    const data = {
      url
    }
    const headers = {
      'contentType': 'json',
      'x-csrf-token': window._csrf
    }
    axios.put('/shop/pushImg', data, { headers })
      .then(res => {
        if (res.data.code === 200) {
          message.success('头像修改成功！');
          localStorage.setItem('user_photo', url);
          dispatch({
            type: PUSH_PERSION_PHOTO,
            url: url
          })
        } else if (res.data.code === 403) {
          message.info('您的账号已经被冻结，请联系管理员解冻！')
        } else {
          message.error('修改失败！')
        }
      })
      .catch(e => {
        message.error('修改失败！')
      })
  }
}

