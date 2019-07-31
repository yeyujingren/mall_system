import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon } from 'antd';
import {
  logout
} from './store/actionCreator'
import '../../style/main.less';

class WorkHeader extends Component {
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

const mapState = state => ({

})
const mapDispatch = dispatch => ({
  logout() {
    dispatch(logout())
  }
})

export default connect(mapState,mapDispatch)(WorkHeader);
