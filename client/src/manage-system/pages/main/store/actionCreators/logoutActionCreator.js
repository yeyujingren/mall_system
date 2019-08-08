/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 11:41:45 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-08 10:28:12
 */
import axios from 'axios';
import { message } from 'antd';

// 退出登录
export const logout = (dispatch) => {
  return () => {
    axios.get('/logout')
      .then(res => {
        if(res.data.code === 200){
          message.success(res.data.message);
          dispatch(history.go('/admin'));
        } else {
          message.error(res.data.message);
        }
      })
      .catch(()=>{
        message.error('出现未知错误！');
      })
  }
}
