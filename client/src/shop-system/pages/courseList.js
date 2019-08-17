import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Row, Col, message } from 'antd';
import { getCourseList } from './store/actionCreator';
import { getMycartLen } from '../component/store/actionCreator';
class CourseList extends Component {
  componentDidMount(){
    this.props.getCourseList();
  }

  // 向localStorage中添加数据
  pushCart(com_id) {
    const data = this.props.courseList;
    let coursesList = JSON.parse(localStorage.getItem('mycart'));
    let course = {}
    for(let i=0;i<data.length;i++){
      if(data[i].com_id === com_id) {
        course = data[i];
        break;
      }
    }
    if(!coursesList){
      localStorage.setItem('mycart',JSON.stringify([course]));
    } else {
      for(let j=0;j<coursesList.length;j++){
        if(course.com_id === coursesList[j].com_id){
          message.info('您已经添加这门课啦，快去购物车结算吧');
          return;
        }
      }
      coursesList.push(course);
      localStorage.setItem('mycart',JSON.stringify(coursesList));
    }
  }

  // 向购物车添加商品
  addToCart(com_id){
    // 验证用户是否登录，若未登录，提示登录
    let cookies = document.cookie.indexOf('EGG_COOK=');
    if (cookies === -1) {
      message.error('您还未登录呦！请登录再试')
    } else {
      this.pushCart(com_id);
      this.props.getMycartLen();
    }
  }
  
  render() {
    const { courseList } = this.props;
    return(
      <div className="home-list">
        <header className="course-header">
          <Icon className="course-icon" type="dingding" /><i>实战课程</i><Icon className="header-right course-icon" type="dingding" />
        </header>
        <div className="course-body">
          <Row className="course-row">
            {
              courseList.map(item => {
                return(
                  <Col key={item.com_id} className="course" span={6}>
                    <img className="course-photo" src={item.com_photo} alt=""/>
                    <p className="course-top">
                      {item.com_name}
                    </p>
                    <p className="course-middle">
                      <span>{item.type}</span>
                      <span><Icon type="user" /> {item.amount}</span>
                      <span>{item.difficulty}</span>
                    </p>
                    <p className="course-bottom">
                      <span className="money">￥ {item.com_price}</span>
                      <span className="buy-now">立即购买</span>
                      <span onClick={() => {this.addToCart(item.com_id)}} className="add-to-cart">加入购物车</span>
                    </p>
                  </Col>
                )
              })
            }
          </Row>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  courseList: state.main.courseList
});

const mapDispatch = dispatch => ({
  getCourseList() {
    dispatch(getCourseList());
  },
  getMycartLen(){
    dispatch(getMycartLen());
  }
})

export default connect(mapState, mapDispatch)(CourseList);
