import React, { Component } from 'react';
import { Form, Icon, Input, Button, Spin, message } from 'antd';
import { connect } from 'react-redux';
import QueuiAnim from 'rc-queue-anim';
import {login} from './store/actionCreators'
import '../../style/login.less';

const FormItem = Form.Item;

class Login extends Component {

  // 点击登录时触发的事件
  handleSubmit(e) {
    // 取消默认的form提交事件
    e.preventDefault();
    // 设置loading为true
    this.props.loading.setState()
    const userInfro = this.props.form.getFieldsValue();
    this.props.handleLogin(userInfro);
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return(
      <div className="login">
        <div className="title">
          <QueuiAnim type={['right','left']}>
            <div>
              商城后台管理系统
            </div>
          </QueuiAnim>
        </div>
        <QueuiAnim delay={3000} type="bottom" key="row" className="form-main">
          <Spin spinning={ false }>
            <Form onSubmit={e => { this.handleSubmit(e) }} className="login-form">
              <FormItem hasFeedback>
                {getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    min: 4,
                    max: 10,
                    message: '用户名为4-10位字符'
                  }]
                })(
                  <Input
                      prefix={<Icon type="user" />}
                      placeholder="userName..."
                  />
                )}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    min: 6,
                    max: 16,
                    message: '密码为6-16个字符'
                  }]
                })(
                  <Input
                      prefix={<Icon type="lock" />}
                      placeholder="password.."
                      type="password"
                  />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </FormItem>
            </Form>
          </Spin>
        </QueuiAnim>
      </div>
    )
  }
}
// export default Form.create()(Login);
const from = Form.create()(Login);

const mapState = state => ({
  loading: state.getIn(['login','login'])
})

const mapDispatch = dispatch => ({
  handleLogin(userInfro){
    console.log('handleLogin:',userInfro)
    dispatch(login(userInfro));
  }
})

export default connect(mapState, mapDispatch)(from);
