import React, { Component } from 'react';
import { Button, Row, Col, Icon } from 'antd';
import '../../style/main.less';

class Header extends Component {
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
            <div className="logup">
            <Icon type="poweroff" />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Header;
