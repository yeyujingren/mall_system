import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Form,
  Input,
  Col,
  Button,
  Upload,
  Icon,
  message
} from 'antd';
import { handleModel, getVerify, confVerify, login, regest } from './store/actionCreator';
class LogModel extends Component {
  regest(e,flag) {
    e.preventDefault();
    const data = this.props.form.getFieldsValue()
    this.props.regest(flag,data);
  }
  handleCancel(flag) {
    this.props.handleModel(flag)
    this.props.form.resetFields();
  }
  reGetCode(flag) {
    this.props.getCode(flag);
  }
  confirmCode(rule,value,callback) {
    const flag = this.props.isConf;
    console.log(flag);
    if(!flag){
      callback('验证码输入错误！')
    }
    return callback()
  }
  confVerify(flag) {
    const code = this.props.form.getFieldsValue(['code'])
    this.props.confVerify(code,flag);
  }
  render() {
    const { visible, flag, verifyCode } = this.props;
    const { getFieldDecorator} = this.props.form;
    // 设置form表单的基础样式配置
    const formItemLayout = {
      labelCol: {
        xs: { span: 24, offset: 4 },
        sm: { span: 5, offset: 4 }
      },
      wrapperCol: {
        xs: { span: 24, offset: 4 },
        sm: { span: 16, offset: 4 }
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
        <Form
            {...formItemLayout}
            onSubmit={(e)=>this.regest(e,flag)}
            className="login-form"
        >
          <Form.Item>
            {getFieldDecorator('user_name', {
              rules: [{ required: true, message: '请填写用户名！' }],
            })(
              <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('psd', {
              rules: [{ required: true, message: '请填写密码' }],
            })(
              <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('code', {
              rules: [
                { required: true, message: '请填写的验证码！' },
                {
                  validator: this.confirmCode
                }
              ]
            })(
              <div className="verify-item">
                <Input
                    type="text"
                    placeholder="请输入验证码"
                    className="code"
                    onBlur={()=>this.confVerify(flag)}
                />
                <div onClick={() => this.reGetCode(flag)}
                    dangerouslySetInnerHTML={{__html:verifyCode}}
                    className="verify"
                ></div>
              </div>
            )}
          </Form.Item>
          <Form.Item>
            <button className="login">
              登录
            </button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const mapState = state => ({
  visible: state.component.visible,
  flag: state.component.flag,
  verifyCode: state.component.verifyCode,
  isConf: state.component.isConf
})

const mapDispatch = dispatch => ({
  handleModel(flag) {
    const visible = false;
    dispatch(handleModel(visible,flag))
  },
  getCode(flag) {
    dispatch(getVerify(flag))
  },
  confVerify(code,flag) {
    dispatch(confVerify(code,flag));
  },
  regest(flag,data){
    if(flag){
      dispatch(login(data));
    } else {
      dispatch(regest(data))
    }
  }
})

export default connect(mapState,mapDispatch)(Form.create({ name: 'form' })(LogModel));
