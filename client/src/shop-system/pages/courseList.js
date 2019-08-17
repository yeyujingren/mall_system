import React, { Component } from 'react';
import { Icon, Row, Col } from 'antd';

class CourseList extends Component {
  render() {
    const data = [0,0,0,0]
    return(
      <div className="home-list">
        <header className="course-header">
          <Icon className="course-icon" type="dingding" /><i>实战课程</i><Icon className="header-right course-icon" type="dingding" />
        </header>
        <div className="course-body">
          <Row className="course-row">
            {
              data.map(item => {
                return(
                  <Col key={item} className="course" span={6}>
                    <img className="course-photo" src="https://img1.mukewang.com/szimg/5d31765d08c90cba06000338.jpg" alt=""/>
                    <p className="course-top">
                      玩转算法系列--图论精讲 面试升值必备（Java版）
                    </p>
                    <p className="course-middle">
                      <span>web</span>
                      <span><Icon type="user" />100</span>
                      <span>简单</span>
                    </p>
                    <p className="course-bottom">
                      <span className="money">￥200</span>
                      <span className="add-to-cart">加入购物车</span>
                    </p>
                  </Col>
                )
              })
            }
          </Row>
          <Row className="course-row">
            {
              data.map(item => {
                return(
                  <Col key={item} className="course" span={6}>
                    <img className="course-photo" src="https://img1.mukewang.com/szimg/5d31765d08c90cba06000338.jpg" alt=""/>
                    <p className="course-top">
                      玩转算法系列--图论精讲 面试升值必备（Java版）
                    </p>
                    <p className="course-middle">
                      <span>web</span>
                      <span><Icon type="user" />100</span>
                      <span>简单</span>
                    </p>
                    <p className="course-bottom">
                      <span className="money">￥200</span>
                      <span className="add-to-cart">加入购物车</span>
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

export default CourseList;
