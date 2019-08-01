import React, { Component } from 'react';
import { connect } from 'react-redux';
import{
  Form,
  Input,
  Select,
} from 'antd';
import {
  willChangeUser
} from './store/actionCreator';
const { Option } = Select;
class ModelForm extends Component{
  changUserInfor(data,id) {
    this.props.changeInfor(data,id)
  }
  render() {
    const {user_name,email,integral,account_status} = this.props.userinfor;
    const {user_id}= this.props;
    const { getFieldDecorator,getFieldsValue } = this.props.form;
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
          onChange={()=>this.changUserInfor(getFieldsValue(),user_id)}
          // onChange={() => console.log(getFieldsValue())}
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
                pattern: new RegExp(/^[1-9]\d*$/, 'g'),
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
      </Form>
    )
  }
}
const ModelHandle = Form.create({ name: 'form' })(ModelForm);

const mapState = state => ({
  user_id: state.main.userId,
  userinfor: state.main.willChangeuserInfor
})
const mapDispatch = dispatch => ({
  changeInfor(data,id) {
    dispatch(willChangeUser(data,id))
  }
})
export default connect(mapState,mapDispatch)(ModelHandle)
