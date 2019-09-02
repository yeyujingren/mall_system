import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { message, Modal } from 'antd';
import CommonList from './commonList';
import Chapter from './chapter';
import { getCourseDetal } from './store/actionCreator';
import { reaclPay } from './store/actionCreator';
import { getMycartLen } from '../component/store/actionCreator';
import '../style/detail.less';

const { confirm } = Modal;
class CourseDetal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: 'chapter'
    }
  }
  componentDidMount() {
    const { type, id } = this.props.match.params;
    this.handleFocus(type);
    this.props.getCourseDetal(id);
  }
  // 验证是否已经购买
  isPay(com_id) {
    let hasPay = JSON.parse(localStorage.getItem('hasPay'));
    for (let i = 0; i < hasPay.length; i++) {
      if (com_id === hasPay[i]) {
        message.info('您已经购买这门课程啦，快去已购课程学习吧');
        return true;
      }
    }
  }
  // 用户点击去结算后弹出确认框，进一步确认
  buyCourseNow(e, course) {
    let coursesList = JSON.parse(localStorage.getItem('mycart'));
    // 验证用户是否登录，若未登录，提示登录
    let cookies = document.cookie.indexOf('EGG_COOK_U=');
    if (cookies === -1) {
      message.error('您还未登录呦！请登录再试');
      return;
    }
    if (this.isPay(course.com_id)) {
      return;
    }
    if (coursesList) {
      for (let j = 0; j < coursesList.length; j++) {
        if (course.com_id === coursesList[j].com_id) {
          message.info('您已经添加这门课到购物车啦，去购物车一起结算吧');
          return;
        }
      }
    }
    let cartList = [];
    // 封装请求头
    const headers = {
      'contentType': 'json',
      'x-csrf-token': window._csrf
    }
    const user_id = localStorage.getItem('user_id');
    cartList.push(course);
    axios.post('/shop/createOrder', { user_id, cartList }, { headers })
      .then(res => {
        if (res.data.code === 200) {
          confirm({
            title: '已生成订单，确认支付？',
            content: '支付成功后等待管理员审核，通过后您将解锁商品，如果不满意可以发起退货请求。',
            cancelText: '我再想想',
            okText: '确认支付',
            onOk() {
              e.props.reaclPay(e, res.data.order_id, user_id, course.com_price);
            },
            onCancel() {
              message.info('您的订单已存放到订单中心!');
            }
          })
        } else if (res.data.code === 403) {
          message.info('您的账号已被冻结，请联系管理员解冻，再选择购买商品！');
        } else {
          message.error('订单生成失败，请稍后重试')
        }
      })
      .catch(() => { message.error('订单生成失败，请稍后重试') });
  }

  // 向localStorage中添加数据
  pushCart(courseDetal) {
    if (this.isPay(courseDetal.com_id)) {
      return;
    }
    let coursesList = JSON.parse(localStorage.getItem('mycart'));
    let course = courseDetal;
    if (!coursesList) {
      localStorage.setItem('mycart', JSON.stringify([course]));
    } else {
      for (let j = 0; j < coursesList.length; j++) {
        if (course.com_id === coursesList[j].com_id) {
          message.info('您已经添加这门课啦，快去购物车结算吧');
          return;
        }
      }
      coursesList.push(course);
      localStorage.setItem('mycart', JSON.stringify(coursesList));
    }
  }

  // 向购物车添加商品
  addToCart(course) {
    // 验证用户是否登录，若未登录，提示登录
    let cookies = document.cookie.indexOf('EGG_COOK_U=');
    if (cookies === -1) {
      message.error('您还未登录呦！请登录再试');
    } else {
      this.pushCart(course);
      this.props.getMycartLen();
    }
  }

  handleFocus(value) {
    this.setState({ 'focus': value });
  }
  handleBtn() {
    const { courseDetal } = this.props;
    const com_id = JSON.parse(this.props.match.params.id);
    const hasPay = JSON.parse(localStorage.getItem('hasPay'));
    if (hasPay.indexOf(com_id) !== -1) {
      return (
        <span onClick={() => message.success('恭喜您距离业界大佬又近了一步^.^')} className="btn detal-buy">
          开始学习
        </span>
      )
    }
    return (
      <Fragment>
        <span onClick={() => this.buyCourseNow(this, courseDetal)} className="btn detal-buy">
          立即购买
        </span>
        <span onClick={() => { this.addToCart(courseDetal) }} className="btn detal-add">
          加购物车
        </span>
      </Fragment>
    )
  }
  render() {
    let params = this.props.match.params;
    const { courseDetal, sum } = this.props;
    return (
      <div className="detal">
        <div className="detal-header">
          <p className="detal-name">{courseDetal ? courseDetal.com_name : null}</p>
        </div>
        <div className="detal-title">
          <div className="detal-main-left">
            <p className="detal-price">￥ {courseDetal ? courseDetal.com_price : null}</p>
            <p className="detal-span">
              <span><i>难度</i>&emsp;{courseDetal ? courseDetal.difficulty : null}</span>
              <span><i>时长</i>&emsp;{courseDetal ? courseDetal.course_time : null}小时</span>
              <span><i>学习人数</i>&emsp;{courseDetal ? courseDetal.amount : null}</span>
            </p>
          </div>
          <div className="detal-main-right">
            {
              this.handleBtn()
            }
          </div>
        </div>
        <div className="detal-main">
          <div className="detal-type">
            <span>
              <Link
                  className={this.state.focus === 'chapter' ? 'detal-link focus' : 'detal-link'}
                  to={`/detal/${params.id}/chapter`}
                  onClick={() => this.handleFocus('chapter')}
              >
                章节目录
              </Link>
            </span>
            <span>
              <Link
                  className={this.state.focus === 'common' ? 'detal-link focus' : 'detal-link'}
                  to={`/detal/${params.id}/common`}
                  onClick={() => this.handleFocus('common')}
              >
                用户评价<sup>{sum}</sup>
              </Link>
            </span>
          </div>
          <Switch>
            <Route path="/detal/:id/common"
                component={CommonList}
            />
            <Route path="/detal/:id/chapter"
                component={Chapter}
            />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  courseDetal: state.main.courseDetal,
  sum: state.main.sum,
  courseList: state.main.courseList
})

const mapDispatch = dispatch => ({
  getCourseDetal(id) {
    dispatch(getCourseDetal(id));
  },
  getMycartLen() {
    dispatch(getMycartLen());
  },
  reaclPay(e, order_id, user_id, totalPrice) {
    dispatch(reaclPay(e, order_id, user_id, totalPrice));
  }
})

export default connect(mapState, mapDispatch)(CourseDetal);
