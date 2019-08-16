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
    const { courseList } = this.props;
    console.log(courseList)
    return (
      <div className="hp-myorder">
        <div className="hp-list">
          <span className="hp-title">已购买课程</span>
        </div>
        <div className="hp-desc">
          <Timeline pending="下一门会是什么呢..." reverse={true}  className="timeline">
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
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  courseList: state.main.courseList
});

const mapDispatch = dispatch => ({
  getHasPayList() {
    const user_id = localStorage.getItem('user_id');
    dispatch(getHasPayList(user_id));
  }
})

export default connect(mapState,mapDispatch)(HasPay);
