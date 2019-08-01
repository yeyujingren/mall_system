/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 15:57:37 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-01 20:09:30
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
  willChangeUser,
  upDateUser
} from './store/actionCreator';
import ModelHandle from './ModelForm'
class UserManage extends Component {
  // 定义组件内部状态
  state = { visible: false };
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
    this.setState({
      visible: true
    })
    this.props.handleWillChangeUser(record)
  }

  // 模态框点击确认按钮后触发
  handleOk = (userInfor,id) => {
    this.props.upDateUser(userInfor,id)
    this.setState({
      visible: false
    });
  };

  // 模态框点击取消按钮后触发
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { dataLits, willChangeUserInfor } = this.props;
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
            visible={this.state.visible}
            onOk={()=>this.handleOk(willChangeUserInfor,user_id)}
            onCancel={()=>this.handleCancel()}
        >
          <ModelHandle />
        </Modal>
      </Fragment>
    )
  }
}



const mapState = state => ({
  dataLits: state.main.userData,
  willChangeUserInfor: state.main.willChangeuserInfor,
  user_id: state.main.userId
})

const mapDispatch = dispacth => ({
  getUserList() {
    dispacth(getList())
  },
  deleteUser(user_id) {
    dispacth(deleteUser(user_id))
  },
  handleWillChangeUser(userInfor) {
    const id = userInfor.user_id
    dispacth(willChangeUser(userInfor,id))
  },
  upDateUser(userInfor,id){
    dispacth(upDateUser(userInfor,id))
  }
})

export default connect(mapState,mapDispatch)(UserManage);
