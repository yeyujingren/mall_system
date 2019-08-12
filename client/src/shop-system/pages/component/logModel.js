import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Form,
  Input,
  Icon,
  message
} from 'antd';
import { handleModel, getVerify, confVerify, login, regest, verifyUserName } from './store/actionCreator';

class LogModel extends Component {
  regest(e,flag){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  login(e,flag) {
    e.preventDefault();
    const that = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        that.props.regest(flag,values);
      }
    });
  }

  handleCancel(flag) {
    this.props.handleModel(flag)
    this.props.form.resetFields();
  }

  reGetCode(flag) {
    this.props.getCode(flag);
  }

  verifyUserName() {
    const user_name = this.props.form.getFieldsValue(['user_name']);
    if(user_name.user_name) {
      this.props.verifyUserName(user_name.user_name);
    }
  }
  render() {
    const { visible, flag, verifyCode, isConf } = this.props;
    console.log(isConf)
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
        {flag
          ?<Form
              {...formItemLayout}
              onSubmit={(e)=>this.login(e,flag)}
              className="login-form"
           >
            <Form.Item>
              {getFieldDecorator('user_name', {
                rules: [
                  { required: true, message: '请填写用户名！' }
                ],
                getValueFromEvent: (event) => {
                  return event.target.value.replace(/\s+/g,'')
                }
              })(
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('psd', {
                rules: [{ required: true, message: '请填写密码' }]
              })(
                <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('code',
                {
                  validateTrigger: 'onChange',
                  rules: [
                    { required: true, message: '请填写的验证码！' }
                  ],
                  getValueFromEvent: (event) => {
                    return event.target.value.replace(/\s+/g,'')
                  }
              })(
                <div className="verify-item">
                  <Input
                      type="text"
                      placeholder="请输入验证码"
                      className="code"
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
          :<Form
              {...formItemLayout}
              onSubmit={(e)=>this.regest(e,flag)}
              className="login-form"
           >
            <Form.Item>
              {getFieldDecorator('user_name', {
                rules: [{ required: true, message: '请填写昵称！' }],
                getValueFromEvent: (event) => {
                  return event.target.value.replace(/\s+/g,'')
                }
              })(
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入您喜欢的昵称"
                    onBlur={()=>this.verifyUserName()}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: '请填写邮箱' },
                  {
                    type: 'email',message: '请输入正确的邮箱地址'
                  }
                ]
              })(
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请填写邮箱"
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
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                />,
              )}
            </Form.Item>
           </Form>
        }
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
  },
  verifyUserName(user_name) {
    console.log(user_name);
    dispatch(verifyUserName(user_name));
  }
})

export default connect(mapState,mapDispatch)(Form.create({ name: 'form' })(LogModel));
