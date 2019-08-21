import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import{
  Form,
  Input,
  Button,
  Upload,
  Icon,
  message,
  Select
} from 'antd';
import {
  upDateComm,
  pushUrl
} from './store/actionCreators/commActionCreator';
const { TextArea } = Input;
const { Option } = Select;
class ModelForm extends Component{
  // 点击确认按钮后获取form表单值
  changCommInfor = (e,id,handlePost) => {
    const that = this;
    e.preventDefault();
    const url = this.props.url;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        that.props.changeInfor(values,id,url,handlePost,that);
        that.props.form.resetFields();
      }
    });
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
    const { com_id,handlePost, url }= this.props;
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
        <Form.Item label="课程名称">
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
        <Form.Item label="课程难度">
          {getFieldDecorator('difficulty', {
            rules:[
              {required: true}
            ],
            initialValue:this.props.commInfor?this.props.commInfor.difficulty:null
          })(
            <Select style={{ width: 150 }}>
              <Option value="简单">简单</Option>
              <Option value="中等">中等</Option>
              <Option value="难">难</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="课程时长">
          {getFieldDecorator('course_time', {
            rules: [
              {
                pattern: new RegExp(/^[0-9]\d*$/, 'g'),
                message: '请填数字！'
              },
              {
                required: true,
                message: '请填写课程时长'
              }
            ],
            initialValue:this.props.commInfor?this.props.commInfor.course_time:null
          })(<Input />)}
        </Form.Item>
        <Form.Item label="课程价格">
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
        <Form.Item label="课程类别">
          {getFieldDecorator('type', {
            rules:[
              {required: true}
            ],
            initialValue:this.props.commInfor?this.props.commInfor.type:null
          })(
            <Select style={{ width: 150 }}>
              <Option value="Web">Web</Option>
              <Option value="Java">Java</Option>
              <Option value="Python">Python</Option>
              <Option value="Android">Android</Option>
              <Option value="PHP">PHP</Option>
            </Select>
          )}
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
                  required: false,
                  message: '请上传商品图片'
                }]
            }
              )(
              <Upload.Dragger
                  name="file"
                  multiple={false}
                  action="/admin/upload"
                  listType="picture"
                  accept=".webp,.jpg,.png,.ico,.gif,.jpeg"
                  showUploadList={false}
                  onChange={info => this.pushPhotoUrl(info)}
              >
                {
                  this.props.commInfor
                  ?<img src={url?url:this.props.commInfor.com_photo} alt="img" style={{ width: '40%' }} />
                  :<div><p className="ant-upload-drag-icon"><Icon type="inbox" /></p><p className="ant-upload-text">支持点击或者拖拽来上传图片</p><p className="ant-upload-hint">若不需要修改图片信息，请不要上传！</p></div>
                }
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
  changeInfor(data,id,url,handlePost,_this) {
    const flag = false;
    dispatch(upDateComm(data,id,url,flag,handlePost,_this))
  },
  pushUrl(url) {
    dispatch(pushUrl(url));
  }
})
export default connect(mapState,mapDispatch)(withRouter(CommModelHandle));
