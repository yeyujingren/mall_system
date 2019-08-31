import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../style/detail.less';

class CourseDetal extends Component {
  constructor(props){
    super(props);
    this.state={
      write:''
    }
  }
  componentDidMount(){
    let com_id = this.props.match.params;
    // this.props.getDetail(com_id);
  }
  handleWrite(e){
    this.setState({write:e.target.value});
  }
  render() {
    return (
      <div className="detal">
        <div className="detal-header">
          <p className="detal-name">react源码深度解析</p>
        </div>
        <div className="detal-title">
          <div className="detal-main-left">
            <p className="detal-price">￥ 399</p>
            <p className="detal-span">
              <span><i>难度</i>&emsp;中等</span>
              <span><i>时长</i>&emsp;22小时</span>
              <span><i>学习人数</i>&emsp;200</span>
            </p>
          </div>
          <div className="detal-main-right">
            <span className="btn detal-buy">
              立即购买
            </span>
            <span className="btn detal-add">
              加购物车
            </span>
          </div>
        </div>
        <div className="detal-main">
          <div className="detal-type">
            <span>
              章节目录
            </span>
            <span>
              用户评价<sup>262</sup>
            </span>
          </div>
          <div className="detal-content">
            <div className="detal-write">
              <textarea
                  name="content"
                  value={this.state.write}
                  onChange={(e) => {this.handleWrite(e)}}
                  placeholder="扯淡、吐槽、表扬、鼓励...想说啥就说啥！">
              </textarea>
              <span className="publish">
                发表评论
              </span>
            </div>
            <article className="content-list">
              <section className="comment-detal">
                <img src="https://img1.sycdn.imooc.com/user/585d5674000133c801000100-100-100.jpg" alt=""/>
                <div className="comment-main">
                  <p className="comment-name">annsede <span className="comment-create">2019/8/31 下午3:35:39</span></p>
                  <p className="comment-value">
                  也学过C和Java，相比之下Python语言简洁，更利于理解，语法上相对容易（尤其是作为动态语言），能够让开发者更专注于业务逻辑的实现。老师讲得重点突出，条理清晰，很多细节都有所涉及，对常见错误和误区也都十分详细地讲解。总之，无论是语言本身，还是课程设置对编程新手都非常友好。
                  </p>
                </div>
              </section>
              <section className="comment-detal">
                <img src="https://img1.sycdn.imooc.com/user/585d5674000133c801000100-100-100.jpg" alt=""/>
                <div className="comment-main">
                  <p className="comment-name">annsede <span className="comment-create">2019/8/31 下午3:35:39</span></p>
                  <p className="comment-value">
                  也学过C和Java，相比之下Python语言简洁，更利于理解，语法上相对容易（尤其是作为动态语言），
                  </p>
                </div>
              </section>
              <section className="comment-detal">
                <img src="https://img1.sycdn.imooc.com/user/585d5674000133c801000100-100-100.jpg" alt=""/>
                <div className="comment-main">
                  <p className="comment-name">annsede <span className="comment-create">2019/8/31 下午3:35:39</span></p>
                  <p className="comment-value">
                  也学过C和Java，相比之下Python语言简洁
                  </p>
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({

})

const mapDispatch = dispatch => ({
  
})

export default connect(mapState,mapDispatch)(CourseDetal);
