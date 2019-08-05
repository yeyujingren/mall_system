/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-02 16:14:03 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-05 16:20:11
 */

import React,{ Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {
  Modal,
  Table,
  Divider,
  Popconfirm,
  Button,
  Icon
} from 'antd';
import {
  getCommList,
  deleteComm,
  willChangeInfor,
  changeVisible
} from './store/actionCreator';
import CommModelHandle from './commModelForm';

class CommManage extends Component {
  // 在页面加载完成后加载展示数据
  componentDidMount() {
    this.props.getCommList();
  }
  // 删除用户
  confirmDelete(com_id) {
    this.props.deleteComm(com_id);
  }
  // 点击显示按钮显示模态框
  showModal(record) {
    this.props.handleModelVisible(record);
  }
  // 模态框点击取消按钮后触发
  handleCancel = () => {
    this.props.handleVisible()
  };
  render() {
    const {dataSource,visible} = this.props;
    // 设置table表头
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'com_name',
        key: 'com_name'
      },
      {
        title: '课程教师',
        dataIndex: 'merchant',
        key: 'merchant'
      },
      {
        title: '售价金额',
        dataIndex: 'com_price',
        key: 'com_price'
      },
      {
        title: '积分',
        dataIndex: 'integral',
        key: 'integral'
      },
      {
        title: '已购买数量',
        dataIndex: 'amount',
        key: 'amount'
      },
      {
        title: '简介',
        dataIndex: 'com_dec',
        key: 'com_key'
      },
      {
        title: '课程图像',
        dataIndex: '',
        key: 'com_photo',
        width: 200,
        render: (record) => {
          return (
            <img src={record.com_photo}
                alt="课程图片"
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
                onConfirm={() => this.confirmDelete(record.com_id)}
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
            rowKey={record => record.com_id}
        />
        <Button type="dashed" onClick={this.add} style={{ width: '70%' }}>
          <Icon type="plus" /> 新增商品
        </Button>
        <Modal
            title="修改会员信息"
            visible={visible}
            onCancel={()=>this.handleCancel()}
            footer={null}
        >
          <CommModelHandle />
        </Modal>
      </Fragment>
    )
  }
}

const mapState = state => ({
  dataSource: state.main.commData,
  visible: state.main.visible
})

// 派发disPatch
const mapDispatch = dispatch => ({
  // 获取商品类表数据
  getCommList() {
    dispatch(getCommList())
  },
  //删除商品数据
  deleteComm(com_id) {
    dispatch(deleteComm(com_id));
  },
  // 点击修改按钮，弹出模态框
  handleModelVisible(record) {
    const flag = true;
    const id = record.com_id;
    dispatch(willChangeInfor(record,id,flag))
  },
  handleVisible() {
    const flag = false;
    dispatch(changeVisible(flag))
  }
})

export default connect(mapState,mapDispatch)(CommManage);