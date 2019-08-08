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
} from './store/actionCreators/commActionCreator';
const { TextArea } = Input;
class ModelForm extends Component{
  // 点击确认按钮后获取form表单值
  changCommInfor = (e,id,handlePost) => {
    e.preventDefault();
    const data = this.props.form.getFieldsValue()
    const url = this.props.url;
    this.props.changeInfor(data,id,url,handlePost)
    this.props.form.resetFields()
  }
  // 上传图片
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
    const {com_id,handlePost}= this.props;
    const { getFieldDecorator} = this.props.form;
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
    return(
      <Form {...formItemLayout}
          onSubmit={e=>this.changCommInfor(e,com_id,handlePost)}
      >
        <Form.Item label="商品名称">
          {getFieldDecorator('com_name', {
            rules: [
              {
                required: true,
                message: '请输入商品名称',
                whitespace: true
              }
            ],
            initialValue:this.props.commInfor?this.props.commInfor.com_name:null
          })(<Input />)}
        </Form.Item>
        <Form.Item label="卖家">
          {getFieldDecorator('merchant', {
            rules: [
              {
                required: true,
                message: '请填写卖家'
              }
            ],
            initialValue:this.props.commInfor?this.props.commInfor.merchant:null
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
                message: '请填写商品价格'
              }
            ],
            initialValue:this.props.commInfor?this.props.commInfor.com_price:null
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
                message: '请填写商品积分'
              }
            ],
            initialValue:this.props.commInfor?this.props.commInfor.integral:null
          })(<Input />)}
        </Form.Item>
        {this.props.commInfor?
          <Form.Item label="已购买数量">
            {getFieldDecorator('amount', {
              rules: [
                {
                  pattern: new RegExp(/^[0-9]\d*$/, 'g'),
                  message: '请填数字！'
                },
                {
                  required: false,
                  message: '请填写修正的已买数量'
                }
              ],
              initialValue:this.props.commInfor?this.props.commInfor.amount:null
            })(<Input />)}
          </Form.Item>
          : null
        }
        <Form.Item label="商品简介">
          {getFieldDecorator('com_dec', {
            rules: [
              {
                required: true,
                message: '请填商品简介'
              }
            ],
            initialValue:this.props.commInfor?this.props.commInfor.com_dec:null
          })(
          <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
          />
          )}
        </Form.Item>
        <Form.Item label="上传图片">
          <div className="dropbox">
            {getFieldDecorator('dragger',{
              rules: [
                {
                  required: true,
                  message: '请上传商品图片'
                }]
            }
              )(
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
  url: state.main.url,
  handlePost: state.main.handlePost
})
const mapDispatch = dispatch => ({
  changeInfor(data,id,url,handlePost) {
    const flag = false;
    dispatch(upDateComm(data,id,url,flag,handlePost))
  },
  pushUrl(url) {
    dispatch(pushUrl(url));
  }
})
export default connect(mapState,mapDispatch)(CommModelHandle)
