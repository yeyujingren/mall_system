import React, { Component } from 'react';
import CarouselModel from './carousel';
import CourseList from './courseList';
class Home extends Component {
  render() {
    return(
      <div>
        <CarouselModel />
        <CourseList type="all" />
      </div>
    )
  }
}

export default Home;
