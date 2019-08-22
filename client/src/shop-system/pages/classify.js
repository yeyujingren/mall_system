import React, { Component, Fragment } from 'react';
import CourseList from './courseList';
import '../style/classify.less';

class Classify extends Component {
  constructor(props){
    super(props);
    this.state = {
      type:''
    }
  }
  componentWillMount(){
    this.getType();
  }
  getType(){
    const type = this.props.match.params.type;
    this.setState({type})
  }
  render(){
    return(
      <Fragment>
        <div className={`pic ${this.state.type}`}></div>
        <CourseList type={this.state.type}></CourseList>
      </Fragment>
    )
  }
}

export default Classify;
