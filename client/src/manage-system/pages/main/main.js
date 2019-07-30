import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './header';
import LeftNav from './leftNav';
import UserManage from './userManage';

// // 通过判断cookie判断用户是否登录
// const isLogin =function  () {
//   let flag = true;
//   // 获取所有cookie
//   let cookies = document.cookie.split(';').map(item => {
//     return item.split('=')
//   });
//   for(let i=0; i<cookies.length;i++){
//     if(cookies[i][0] === 'EGG_COOK'){
//       flag = false;
//       break;
//     }
//   }
//   console.log(flag)
//   return flag;
// }


class ManageIndex extends Component {
  render() {
    // // 判断是否登录，如果没有登录就重定向到登录界面
    // if(isLogin){
    //   return <Redirect to="/" />
    // }
    return(
      <div>
        <Header />
        <LeftNav />
      </div>
    )
  }
}


// const mapDispatch = dispatch => ({
//   // 判断是否有EGG_COOKIE来验证是否登录
//   isLogin() {
//     let flag =false;
//     // 获取所有cookie
//     let cookies = document.cookie.split(';').map(item => {
//       return item.split('=')
//     });
//     for(let i=0; i<cookies.length;i++){
//       if(cookies[i][0] === 'EGG_COOKIE'){
//         flag = true;
//         return flag;
//       }
//     }
//     dispatch(isLogin(flag))
//   }
// })

// const mapState = state => ({
//   'login': state.getIn(['login','login'])
// })
export default ManageIndex;
