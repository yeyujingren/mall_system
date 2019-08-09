import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Form,
  Input,
  Button,
  Upload,
  Icon,
  message
} from 'antd';
import { handleModel } from './store/actionCreator';
class LogModel extends Component {
  handleCancel(flag) {
    this.props.handleModel(flag)
  }
  render() {
    const { visible, flag } = this.props;
    // 设置form表单的基础样式配置
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <Modal
          title={flag?'登录':'注册'}
          visible={visible}
          onCancel={() => this.handleCancel(null)}
          centered
          footer={null}
          width={420}
      >
        <Form {...formItemLayout}>
          
        </Form>
      </Modal>
    )
  }
}

const mapState = state => ({
  visible: state.component.visible,
  flag: state.component.flag
})

const mapDispatch = dispatch => ({
  handleModel(flag) {
    const visible = false;
    dispatch(handleModel(visible,flag))
  }
})

export default connect(mapState,mapDispatch)(LogModel);
