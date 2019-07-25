import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isLogin } from './store/actionCreators'

class ManageIndex extends Component {
  componentDidMount() {
    this.props.isLogin
  }
  render() {
    const { login } = this.props
    // 判断是否登录，如果没有登录就重定向到登录界面
    if(!login){
      return <Redirect to="/" />
    }
    return(
      <div>
        管理界面
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  // 判断是否有EGG_COOKIE来验证是否登录
  isLogin() {    
    let flag =false;
    // 获取所有cookie
    let cookies = document.cookie.split(';').map(item => {
      return item.split('=')
    });
    for(let i=0; i<cookies.length;i++){
      if(cookies[i][0] === 'EGG_COOKIE'){
        flag = true;
        return flag;
      }
    }
    dispatch(isLogin(flag))
  }
})

const mapState = state => ({
  'login': state.getIn(['login','login'])
})
export default connect(mapState,mapDispatch)(ManageIndex);
