import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Row, Col } from 'antd';
import { fuzzySearch } from './store/actionCreator';
import '../style/searchPage.less';
import { serialize } from 'uri-js';

class SearchPage extends Component {
  componentDidMount() {
    let key = this.props.match.params.key;
    this.props.fuzzySearch(key);
  }
  render(){
    const { searchList } = this.props;
    return(
      <div className="search-page">
        <div className="title">
          <Icon className="svg-left" type="crown" />
          <span>
            全站结果（{searchList.length}）
          </span>
          <Icon className="svg-right" type="crown" />
        </div>
        <div className="search-list">
          {
            searchList.map( item => {
              return(
                <Row key={item.com_id} className="search-item">
                  <Col span={7}>
                    <img className="s-course-photo" src={item.com_photo} alt=""/>
                  </Col>
                  <Col className="right" span={17}>
                    <div className="search-course">
                      <span className="s-title">
                        {item.com_name}
                      </span>
                      <span className="s-desc">
                        {item.com_dec}
                      </span>
                      <span className="s-type">
                        <i className="type">{item.type}</i>
                        <i className="teach">讲师：{item.merchant}</i>
                        <i className="difficulty">{item.difficulty}</i>
                        <i><Icon className="user" type="user" />{item.amount}</i>
                        <i>￥ {item.com_price}</i>
                      </span>
                    </div>
                    <div className="s-btn">
                      <span className="buy-now">立即购买</span>
                      <span className="add-to-cart">加入购物车</span>
                    </div>
                  </Col>
                </Row>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  searchList: state.main.courseList
})

const mapDispatch = dispatch => ({
  fuzzySearch(key){
    dispatch(fuzzySearch(key))
  }
})
export default connect(mapState,mapDispatch)(SearchPage);
