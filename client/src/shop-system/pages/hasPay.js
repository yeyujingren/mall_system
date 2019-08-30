import React, { Component } from 'react';
import { Timeline, message } from 'antd';
import { connect } from 'react-redux';
import { getHasPayList } from './store/actionCreator';
import '../style/hasPay.less';
class HasPay extends Component {
  componentDidMount(){
    this.handleverify();
  }
  // 验证用户身份，若未登录则跳转到首页
  handleverify() {
    let cookies = document.cookie.indexOf('EGG_COOK_U=');
    if (cookies === -1) {
      this.props.history.push('/')
    } else {
      this.props.getHasPayList();
    }
  }
  render() {
    const { courseList } = this.props;
    return (
      <div className="hp-myorder">
        <div className="hp-list">
          <span className="hp-title">已购买课程</span>
        </div>
        <div className="hp-desc">
          {
            courseList.length !== 0
            ?<Timeline pending="下一门会是什么呢..." reverse={true}  className="timeline">
              {
                courseList.map( item => {
                  return item.comms.map( course => {
                    return(
                      <Timeline.Item key={course.com_id}>
                        <div className="hp-col-show">
                          <img className="course-img"
                              src={course.com_photo}
                              alt="img"
                          />
                          <div className="hp-main-desc">
                            <p>
                              <span className="course-name">{course.com_name}</span>
                              <span className="course-type">[ {course.type} ]</span>
                            </p>
                            <p>
                              <span className="course-price">购买价格：￥{course.com_price}</span>
                              <span className="course-time">所需时长： {course.course_time}h</span>
                              <span className="course-teac">授课老师：<i>{course.teacher}</i></span>
                            </p>
                            <p>
                              <span onClick={() =>message.info(`恭喜您，距离成为${course.type}界大佬又近了一步^.^`)} className="begin-start">
                                开始学习
                              </span>
                            </p>
                          </div>
                        </div>
                      </Timeline.Item>)
                  })
                })
              }
            </Timeline>
            : <div className="none">您还未购买任何课程，快去开启大师之旅吧</div>
          }
          
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  courseList: state.main.hasPayList
});

const mapDispatch = dispatch => ({
  getHasPayList() {
    const user_id = localStorage.getItem('user_id');
    dispatch(getHasPayList(user_id));
  }
})

export default connect(mapState,mapDispatch)(HasPay);
