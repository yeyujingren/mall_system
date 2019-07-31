import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import WorkHeader from './header';
import LeftNav from './leftNav';
import UserManage from './userManage';

const { Sider, Content } = Layout;
class ManageIndex extends Component {
  render() {
    // 通过判断cookie判断用户是否登录
    let cookies = document.cookie.indexOf('EGG_COOK=');
    if(cookies === -1){
      return <Redirect to="/" />
    }
    return(
      <Layout>
        <WorkHeader />
        <Layout>
          <Sider>
            <LeftNav />
          </Sider>
          <Content>
            <UserManage />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default ManageIndex;
