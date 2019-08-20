/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 11:41:45 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-20 15:36:17
 */
import axios from 'axios';
import { message } from 'antd';

// 退出登录
export const logout = (_this) => {
  return (dispatch) => {
    axios.get('/logout')
      .then(res => {
        if(res.data.code === 200){
          message.success(res.data.message);
          _this.props.history.push('/admin');
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
