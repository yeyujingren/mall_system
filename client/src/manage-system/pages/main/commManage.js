import React,{ Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import '../../style/main.less';
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
} from './store/actionCreators/commActionCreator';
import CommModelHandle from './commModelForm';

class CommManage extends Component {
  // 在页面加载完成后加载展示数据
  componentDidMount() {
    this.props.getCommList(this);
  }
  // 删除用户
  confirmDelete(com_id) {
    this.props.deleteComm(com_id,this);
  }
  // 点击显示按钮显示模态框
  showModal(record) {
    const handlePost = 1;
    this.props.handleModelVisible(record,handlePost);
  }
  // 模态框点击取消按钮后触发
  handleCancel = () => {
    this.props.handleVisible();
  };
  // 点击新增商品后触发
  addComm() {
    const handlePost = 2;
    this.props.addNewComm(handlePost);
  }
  render() {
    const {dataSource,visible} = this.props;
    // 设置table表头
    const columns = [
      {
        title: '课程名称',
        dataIndex: 'com_name',
        key: 'com_name',
        align:'center',
        fixed: 'left',
        width:150
      },
      {
        title: '课程教师',
        dataIndex: 'merchant',
        key: 'merchant',
        align:'center',
        fixed: 'left',
        width:150
      },
      {
        title: '课程难度',
        dataIndex: 'difficulty',
        key: 'difficulty',
        align:'center',
        width:100
      },
      {
        title: '课程时长',
        dataIndex: 'course_time',
        key: 'course_time',
        align:'center',
        width:100
      },
      {
        title: '售价金额',
        dataIndex: 'com_price',
        key: 'com_price',
        align:'center',
        width:100
      },
      {
        title: '积分',
        dataIndex: 'integral',
        key: 'integral',
        align:'center',
        width:100
      },
      {
        title: '已购买数量',
        dataIndex: 'amount',
        key: 'amount',
        align:'center',
        width:100
      },
      {
        title: '课程类型',
        dataIndex: 'type',
        key: 'type',
        align:'center',
        width:100
      },
      {
        title: '课程图像',
        dataIndex: '',
        key: 'com_photo',
        align:'center',
        width: 100,
        render: (record) => {
          return (
            <img src={record.com_photo}
                alt="img"
                style={{'width':'30px','height':'30px'}}
            />
          )
        }
      },
      {
        title: '简介',
        dataIndex: 'com_dec',
        key: 'com_key',
        align:'center'
      },
      {
        title: '操作',
        key: 'action',
        align:'center',
        fixed: 'right',
        width: 150,
        render: (record) => (
          <span>
            <a href="javascript:;"
                onClick={() => this.showModal(record)}
            >修改</a>
            <Divider type="vertical" />
            <Popconfirm
                title="确认删除该商品？"
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
    // 配置每页展示数量
    const pagination = {
      pageSize: 5
    }
    return(
      <Fragment>
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={record => record.com_id}
            scroll={{ x: 1450 }}
            className="com-table"
            pagination={pagination}
        />
        <Button type="dashed" onClick={() => this.addComm()} style={{ width: '70%' }}>
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
  getCommList(_this) {
    dispatch(getCommList(_this))
  },
  deleteComm(com_id,_this) {
    dispatch(deleteComm(com_id,_this));
  },
  handleModelVisible(record,handlePost) {
    const flag = true;
    const id = record.com_id;
    dispatch(willChangeInfor(record,id,flag,handlePost))
  },
  handleVisible() {
    const flag = false;
    dispatch(changeVisible(flag))
  },
  addNewComm(handlePost) {
    const flag = true;
    dispatch(willChangeInfor(null,null,flag,handlePost))
  }
})

export default connect(mapState,mapDispatch)(withRouter(CommManage));
