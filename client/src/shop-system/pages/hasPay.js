import React, { Component } from 'react';
import { Timeline, message } from 'antd';
import { connect } from 'react-redux';
import { getHasPayList } from './store/actionCreator';
import '../style/hasPay.less';
class HasPay extends Component {
  componentDidMount(){
    this.hasPayList();
  }
  // 获取已购课程列表
  hasPayList() {
    this.props.getHasPayList();
  }
  render() {
    return (
      <div className="hp-myorder">
        <div className="hp-list">
          <span className="hp-title">已购买课程</span>
        </div>
        <div className="hp-desc">
          <Timeline pending="下一门会是什么呢..." reverse={true}  className="timeline">
            <Timeline.Item>
              <div className="hp-col-show">
                <img className="course-img"
                    src="https://img.mukewang.com/549bda090001c53e06000338-240-135.jpg"
                    alt="img"
                />
                <div className="hp-main-desc">
                  <p>
                    <span className="course-name">Ajax全面解除</span>
                    <span className="course-type">[ Web ]</span>
                  </p>
                  <p>
                    <span className="course-price">购买价格：￥123</span>
                    <span className="course-time">所需时长： 12h</span>
                    <span className="course-teac">授课老师：<i>难得糊涂</i></span>
                  </p>
                  <p>
                    <span className="begin-start">
                      开始学习
                    </span>
                  </p>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item>
              <div className="hp-col-show">
                <img className="course-img"
                    src="https://img.mukewang.com/549bda090001c53e06000338-240-135.jpg"
                    alt="img"
                />
                <div className="hp-main-desc">
                  <p>
                    <span className="course-name">Ajax全面解除</span>
                    <span className="course-type">[ Web ]</span>
                  </p>
                  <p>
                    <span className="course-price">购买价格：￥123</span>
                    <span className="course-time">所需时长： 12h</span>
                    <span className="course-teac">授课老师：<i>难得糊涂</i></span>
                  </p>
                  <p>
                    <span onClick={() => {message.info('恭喜您，距离web界大佬又近了一步^.^')}} className="begin-start">
                      开始学习
                    </span>
                  </p>
                </div>
              </div>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
    )
  }
}

const mapState = state => ({

});

const mapDispatch = dispatch => ({
  getHasPayList() {
    const user_id = localStorage.getItem('user_id');
    dispatch(getHasPayList(user_id));
  }
})

export default connect(mapState,mapDispatch)(HasPay);
