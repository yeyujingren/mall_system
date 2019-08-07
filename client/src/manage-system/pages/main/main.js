import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import WorkHeader from './header';
import LeftNav from './leftNav';
import UserManage from './userManage';
import CommManage from './commManage';
import OrderManage from './orderManage';

const { Sider, Content } = Layout;
class ManageIndex extends Component {
  render() {
    // 通过判断cookie判断用户是否登录
    let cookies = document.cookie.indexOf('EGG_COOK=');
    if (cookies === -1) {
      return <Redirect to="/" />
    }
    return (
      <Layout>
        <WorkHeader />
        <Layout>
          <Sider>
            <LeftNav />
          </Sider>
          <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280
              }}
          >
            <Switch>
              <Route path="/index/comm"
                  component={CommManage}
              />
              <Route path="/index/user"
                  component={UserManage}
              />
              <Route path="/index/order"
                  component={OrderManage}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default ManageIndex;
