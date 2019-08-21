import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import{
  Form,
  Input,
  Select,
  Button
} from 'antd';
import {
  upDateUser
} from './store/actionCreators/userActionCreator';
const { Option } = Select;
class ModelForm extends Component{
  // 点击确认按钮触发
  changUserInfor = (e,id) => {
    const that = this;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        that.props.changeInfor(values,id,that);
        that.props.form.resetFields();
      }
    });
  }
  render() {
    const {user_name,email,integral,account_status} = this.props.userinfor;
    const {user_id}= this.props;
    const { getFieldDecorator} = this.props.form;
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
    return(
      <Form {...formItemLayout}
          onSubmit={e=>this.changUserInfor(e,user_id)}
      >
        <Form.Item label="会员昵称">
          {getFieldDecorator('user_name', {
            rules: [
              {
                required: true,
                message: '请输入要修改的会员昵称',
                whitespace: true
              }
            ],
            initialValue:user_name
          })(<Input />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '请填写邮箱'
              },
              {
                required: true,
                message: '请输入正确格式的邮箱地址'
              }
            ],
            initialValue:email
          })(<Input />)}
        </Form.Item>
        <Form.Item label="会员积分">
          {getFieldDecorator('integral', {
            rules: [
              {
                pattern: new RegExp(/^[0-9]\d*$/, 'g'),
                message: '请填数字！'
              },
              {
                required: true,
                message: '请填写修正的会员积分'
              }
            ],
            initialValue:integral
          })(<Input />)}
        </Form.Item>
        <Form.Item label="账户状态">
          {getFieldDecorator('account_status', {
            rules:[
              {required: true}
            ],
            initialValue:account_status
          })(
            <Select style={{ width: 150 }}>
              <Option value="normal">normal</Option>
              <Option value="frozen">frozen</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            确认
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
const UserModelHandle = Form.create({ name: 'form' })(ModelForm);

const mapState = state => ({
  user_id: state.main.userId,
  userinfor: state.main.willChangeInfor
})
const mapDispatch = dispatch => ({
  changeInfor(data,id,_this) {
    const flag = false;
    dispatch(upDateUser(data,id,flag,_this))
  }
});
export default connect(mapState,mapDispatch)(withRouter(UserModelHandle));
