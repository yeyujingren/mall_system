import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {  Icon, Modal, Form, Input, Tooltip } from 'antd';
import { changePersionInfor } from './store/actionCreator';
import '../style/persion.less';

class Persion extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      flag:0 // 0标识邮箱，1标识密码
    }
  }
  componentDidMount(){
    let cookies = document.cookie.indexOf('EGG_COOK_U=');
    if (cookies === -1) {
      this.props.history.push('/')
    }
  }
  handleVisible(visible,flag) {
    this.setState({visible});
    this.setState({flag})
  }
  handleChange(e,flag) {
    const id = localStorage.getItem('user_id');
    e.preventDefault();
    const that = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        that.props.changeInfor(flag,values,id,this);
        this.setState({'visible': false});
        that.props.form.resetFields();
      }
    });
  }
  render() {
    const { getFieldDecorator} = this.props.form;
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
      <Fragment>
        <Modal
            visible={this.state.visible}
            title={this.state.flag?'密码更改':'邮箱账号更改'}
            // onOk={this.handleOk}
            onCancel={() => this.handleVisible(false,null)}
            footer={false}
        >
          {
            !this.state.flag
            ?<Form
                onSubmit={(e)=>this.handleChange(e,this.state.flag)}
                {...formItemLayout}
                className="login-form"
             >
              <Form.Item>
                {getFieldDecorator('psd', {
                  rules: [
                    {
                      required: true,
                      message: '请填写密码'
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ],
                  getValueFromEvent: (event) => {
                    return event.target.value.replace(/\s+/g,'')
                  }
                })(
                  <Input.Password
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="请输入密码"
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
                  ],
                  getValueFromEvent: (event) => {
                    return event.target.value.replace(/\s+/g,'')
                  }
                })(
                  <Input
                      prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="请填写要修改的邮箱"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <button className="login">
                  确认更改
                </button>
              </Form.Item>
            </Form>
            :<Form
                onSubmit={(e)=>this.handleChange(e,this.state.flag)}
                {...formItemLayout}
                className="login-form"
             >
               <Form.Item>
                {getFieldDecorator('oldPsd', {
                  rules: [
                    {
                      required: true,
                      min: 6,
                      max: 12,
                      message: '密码要求6-12位'
                    }
                  ],
                  getValueFromEvent: (event) => {
                    return event.target.value.replace(/\s+/g,'')
                  }
                })(
                  <Input.Password
                      prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="请输入原密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('newPsd', {
                  rules: [
                    {
                      required: true,
                      min: 6,
                      max: 12,
                      message: '密码要求6-12位'
                    }
                  ],
                  getValueFromEvent: (event) => {
                    return event.target.value.replace(/\s+/g,'')
                  }
                })(
                  <Input.Password
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="请输入要更改的密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <button className="login">
                  确认更改
                </button>
              </Form.Item>
            </Form>
          }
        </Modal>
        <div className="persional">
          <div className="item">
            <span>
              <img className="per-photo" src="https://img.mukewang.com/5458640c0001b0a702200220-200-200.jpg" alt=""/>
            </span>
            <span>
              更改头像
            </span>
          </div>
          <div className="item">
            <span className="span-icon">
              <Icon className="icon" type="barcode" />
            </span>
            <span className="span-type">
              <p className="per-item">ID: 123456</p>
              <p className="intro">用户唯一标识id</p>
            </span>
          </div>
          <div className="item">
            <span className="span-icon">
              <Icon className="icon" type="money-collect" />
            </span>
            <span className="span-type">
              <p className="per-item">积分： 1024</p>
              <p className="intro">用户购买课程所赠积分</p>
            </span>
          </div>
          <div className="item">
            <span className="span-icon">
              <Icon className="icon" type="user" />
            </span>
            <span className="span-type">
              <p className="per-item">昵称：夜雨惊人</p>
              <p className="intro">用户昵称不可再次更改</p>
            </span>
          </div>
          <div className="item">
            <span className="span-icon">
              <Icon className="icon" type="mail" />
            </span>
            <span className="span-type">
              <p className="per-item">电子邮箱：1234@gamil.com</p>
              <p className="intro">用于验证用户信息的真实性</p>
            </span>
            <span onClick={() => this.handleVisible(true,0)} className="change-action">
              <Tooltip title="您将需要输入密码来验证是否是本人更改">
                <Icon type="question-circle-o" />更改邮箱
              </Tooltip>
            </span>
          </div>
          <div className="item">
            <span className="span-icon">
              <Icon className="icon" type="safety-certificate" />
            </span>
            <span className="span-type">
              <p className="per-item">密码：已设置</p>
              <p className="intro">用于保护账号信息和登录安全</p>
            </span>
            <span onClick={() => this.handleVisible(true,1)} className="change-action">
              更改密码
            </span>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapState = state => ({

})

const mapDispatch = dispatch => ({
  changeInfor(flag,values,id,_this) {
    dispatch(changePersionInfor(flag,values,id,_this))
  }
})

export default connect(mapState,mapDispatch)(Form.create({ name: 'form' })(withRouter(Persion)));
