import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';

class LeftNav extends Component {
  render() {
    const { Sider } = Layout;
    return(
      <Layout className="left-nav">
        <Sider
            style={{
              overflow: 'auto',
              height:'100vh',
              position: 'fixed',
              left: 0
            }}
        >
          <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1">
              <Link to="/index/user">
                <Icon className="nav-icon" type="contacts" theme="twoTone" />
                <span className="nav-text">会员管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/index/comm">
                <Icon className="nav-icon" type="dollar" theme="twoTone" />
                <span className="nav-text">商品管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/index/order">
                <Icon className="nav-icon" type="reconciliation" theme="twoTone" />
                <span className="nav-text">订单管理</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    )
  }
}

export default LeftNav;
