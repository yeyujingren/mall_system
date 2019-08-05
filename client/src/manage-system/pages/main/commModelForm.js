import React, { Component } from 'react';
import { connect } from 'react-redux';
import{
  Form,
  Input,
  Button,
  Upload,
  Icon,
  message
} from 'antd';
import {
  upDateComm,
  pushUrl
} from './store/actionCreator';
const { TextArea } = Input;
class ModelForm extends Component{
  changCommInfor = (e,id) => {
    e.preventDefault();
    const data = this.props.form.getFieldsValue()
    console.log(data)
    const url = this.props.url;
    this.props.changeInfor(data,id,url)
    this.props.form.resetFields()
  }
  pushPhotoUrl(info){
    const { status } = info.file;
    if (status === 'done') {
      const url = info.file.response.url;
      this.props.pushUrl(url);
      message.success(`${info.file.name}上传成功！`);
    } else if (status === 'error') {
      message.error(`${info.file.name}上传失败！`);
    }
    
  }
  render() {
    const {com_name,merchant,com_price,integral,amount,com_dec} = this.props.commInfor;
    const {com_id}= this.props;
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
          onSubmit={e=>this.changCommInfor(e,com_id)}
      >
        <Form.Item label="商品名称">
          {getFieldDecorator('com_name', {
            rules: [
              {
                required: true,
                message: '请输入要修改的商品名称',
                whitespace: true
              }
            ],
            initialValue:com_name
          })(<Input />)}
        </Form.Item>
        <Form.Item label="卖家">
          {getFieldDecorator('merchant', {
            rules: [
              {
                required: true,
                message: '请填写修改的卖家'
              }
            ],
            initialValue:merchant
          })(<Input />)}
        </Form.Item>
        <Form.Item label="商品价格">
          {getFieldDecorator('com_price', {
            rules: [
              {
                pattern: new RegExp(/^[0-9]\d*$/, 'g'),
                message: '请填数字！'
              },
              {
                required: true,
                message: '请填写修正的商品价格'
              }
            ],
            initialValue:com_price
          })(<Input />)}
        </Form.Item>
        <Form.Item label="商品积分">
          {getFieldDecorator('integral', {
            rules: [
              {
                pattern: new RegExp(/^[0-9]\d*$/, 'g'),
                message: '请填数字！'
              },
              {
                required: true,
                message: '请填写修正的商品积分'
              }
            ],
            initialValue:integral
          })(<Input />)}
        </Form.Item>
        <Form.Item label="已购买数量">
          {getFieldDecorator('amount', {
            rules: [
              {
                pattern: new RegExp(/^[0-9]\d*$/, 'g'),
                message: '请填数字！'
              },
              {
                required: true,
                message: '请填写修正的已买数量'
              }
            ],
            initialValue:amount
          })(<Input />)}
        </Form.Item>
        <Form.Item label="商品简介">
          {getFieldDecorator('com_dec', {
            rules: [
              {
                required: true,
                message: '请填商品简介'
              }
            ],
            initialValue:com_dec
          })(
          <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
          />
          )}
        </Form.Item>
        <Form.Item label="上传图片">
          <div className="dropbox">
            {getFieldDecorator('dragger')(
              <Upload.Dragger
                  name="file"
                  multiple={false}
                  action="/upload"
                  accept=".webp,.jpg,.png,.ico,.gif,.jpeg"
                  onChange={info => this.pushPhotoUrl(info)}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">支持点击或者拖拽来上传图片</p>
                <p className="ant-upload-hint">若不需要修改图片信息，请不要上传！</p>
              </Upload.Dragger>,
            )}
          </div>
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
const CommModelHandle = Form.create({ name: 'form' })(ModelForm);

const mapState = state => ({
  com_id: state.main.userId,
  commInfor: state.main.willChangeInfor,
  url: state.main.url
})
const mapDispatch = dispatch => ({
  changeInfor(data,id,url) {
    const flag = false;
    dispatch(upDateComm(data,id,url,flag))
  },
  pushUrl(url) {
    console.log(url)
    dispatch(pushUrl(url));
  }
})
export default connect(mapState,mapDispatch)(CommModelHandle)
