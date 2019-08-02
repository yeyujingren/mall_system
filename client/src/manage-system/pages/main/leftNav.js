import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

class LeftNav extends Component {
  render() {
    const { Header, Content, Footer, Sider } = Layout;
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
              <Icon className="nav-icon" type="contacts" theme="twoTone" />
              <span className="nav-text">会员管理</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon className="nav-icon" type="dollar" theme="twoTone" />
              <span className="nav-text">商品管理</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon className="nav-icon" type="reconciliation" theme="twoTone" />
              <span className="nav-text">订单管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    )
  }
}

export default LeftNav;
