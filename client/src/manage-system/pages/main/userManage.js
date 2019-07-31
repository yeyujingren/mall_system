/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 15:57:37 
 * @Last Modified by: 
 * @Last Modified time: 2019-07-31 20:50:04
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Divider } from 'antd';
import {getList} from './store/actionCreator'

class UserManage extends Component {
  componentDidMount() {
    this.props.getUserList();
  }
  render() {
    const { data } = this.props;
    console.log(data.length);
    const dataSource = data.length ? data : [];
    // 设置table表头
    const columns = [
      {
        title: '姓名',
        dataIndex: 'user_name',
        key: 'user_name'
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: '会员等级',
        dataIndex: 'vip_level',
        key: 'vip_level'
      },
      {
        title: '会员积分',
        dataIndex: 'integral',
        key: 'integral'
      },
      {
        title: '账号状态',
        dataIndex: 'account_status',
        key: 'account_status'
      },
      {
        title: '头像',
        dataIndex: 'user_photo',
        key: 'user_photo'
      },
      {
        title: '操作',
        key: 'action',
        render: () => (
          <span>
            <a href="javascript:;">修改</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
          </span>
        )
      }
    ]
    return(
      <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={record => record.user_id}
      />
    )
  }
}

const mapState = state => ({
  data: state.getIn(['main','userData'])
})

const mapDispatch = dispacth => ({
  getUserList() {
    dispacth(getList())
  }
})

export default connect(mapState,mapDispatch)(UserManage);
