/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 15:57:37 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-13 14:25:09
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Table,
  Divider,
  Popconfirm
} from 'antd';
import {
  getList,
  deleteUser,
  willChangeInfor,
  upDateUser,
  changeVisible
} from './store/actionCreators/userActionCreator';
import UserModelHandle from './userModelForm';
class UserManage extends Component {
  // 获取用户列表
  componentDidMount() {
    this.props.getUserList();
  }
  // 删除用户
  confirmDelete(user_id) {
    this.props.deleteUser(user_id)
  }
  // 模态框状态控制
  showModal = (record) => {
    this.props.handleWillChangeUser(record)
  }

  // 模态框点击取消按钮后触发
  handleCancel = () => {
    this.props.handleVisible()
  };
  render() {
    const { dataLits, willChangeUserInfor,visible } = this.props;
    const {user_id} = this.props;
    const dataSource = dataLits;
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
        key: 'user_photo',
        dataIndex: '',
        width: 150,
        render: (record) => {
          return (
            <img src={record.user_photo}
                alt="头像"
                style={{'width':'30px','height':'30px'}}
            />
          )
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (record) => (
          <span>
            <a href="javascript:;"
                onClick={() => this.showModal(record)}
            >修改</a>
            <Divider type="vertical" />
            <Popconfirm
                title="确认删除该用户？"
                onConfirm={() => this.confirmDelete(record.user_id)}
                onCancel={()=>{}}
                okText="确认"
                cancelText="取消"
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        )
      }
    ]
    return(
      <Fragment>
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={record => record.user_id}
        />
        <Modal
            title="修改会员信息"
            visible={visible}
            onOk={()=>this.handleOk(willChangeUserInfor,user_id)}
            onCancel={()=>this.handleCancel()}
            footer={null}
        >
          <UserModelHandle />
        </Modal>
      </Fragment>
    )
  }
}



const mapState = state => ({
  dataLits: state.main.userData,
  willChangeUserInfor: state.main.willChangeInfor,
  user_id: state.main.userId,
  visible: state.main.visible
})

const mapDispatch = dispatch => ({
  getUserList() {
    dispatch(getList())
  },
  deleteUser(user_id) {
    dispatch(deleteUser(user_id))
  },
  handleWillChangeUser(userInfor) {
    const id = userInfor.user_id;
    const flag = true;
    dispatch(willChangeInfor(userInfor,id,flag))
  },
  upDateUser(userInfor,id){
    dispatch(upDateUser(userInfor,id))
  },
  handleVisible() {
    const flag = false;
    dispatch(changeVisible(flag))
  }
})

export default connect(mapState,mapDispatch)(UserManage);
