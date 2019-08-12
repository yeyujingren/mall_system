import React, { Component } from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import QueuiAnim from 'rc-queue-anim';
import {
  login,
  loading
} from './store/actionCreators'
import '../../style/login.less';

const FormItem = Form.Item;

class Login extends Component {
  // 点击登录时触发的事件
  handleSubmit(e) {
    const that = this;
    // 取消默认的form提交事件
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleLoading();
        // 设置1秒延时，展示loading效果
        setTimeout(() => {that.props.handleLogin(values)}, 1000);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;

    // 通过判断cookie判断用户是否登录
    let cookies = document.cookie.indexOf('EGG_COOK=');
    if(cookies !== -1){
      return <Redirect to="/index" />
    }
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
          <Spin spinning={loading}>
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
const from = Form.create()(Login);

const mapState = state => ({
  loading: state.login.loading,
  login: state.login.login
})

const mapDispatch = dispatch => ({
  handleLoading() {
    dispatch(loading());
  },
  handleLogin(userInfro){
    dispatch(login(userInfro));
  }
})

export default withRouter(connect(mapState, mapDispatch)(from));
