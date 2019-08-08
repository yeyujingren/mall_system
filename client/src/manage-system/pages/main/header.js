import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon } from 'antd';
import {
  logout
} from './store/actionCreators/logoutActionCreator'
import '../../style/main.less';

class WorkHeader extends Component {
  // 点击退出登录触发
  handleLogOut() {
    this.props.logout()
  }
  render() {
    return(
      <div className="header">
        <Row className="row">
          <Col span={20}>
            <Icon className="logo" type="alibaba" />
            <p className="sys-name">
              商城后台管理系统
            </p>
          </Col>
          <Col className="right" span={4}>
            <div className="role">
              <Icon type="user" />
              <span className="role-name">管理员</span>
            </div>
            <div onClick={() => {this.handleLogOut()}} className="logup">
            <Icon type="poweroff" />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  logout() {
    dispatch(logout())
  }
})

export default connect(null,mapDispatch)(WorkHeader);
