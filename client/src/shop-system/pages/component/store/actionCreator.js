/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-09 09:54:11 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-09 10:23:00
 */
import axios from 'axios';
import { message } from 'antd';
import {HANDLE_MODEL_VISIBLE} from './actionType';

// 登录注册模态框控制
export const handleModel = (visible,flag) => ({
  type: HANDLE_MODEL_VISIBLE,
  visible,
  flag
})
