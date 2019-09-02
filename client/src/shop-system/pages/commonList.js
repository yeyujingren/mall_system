import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { getDetail, handlePublish, commonWrite } from './store/actionCreator';

class CommonList extends Component {
  componentDidMount(){
    const com_id = this.props.match.params.id;
    this.props.getDetail(com_id);
  }
  handleWrite(e){
    let value = e.target.value.replace(/\s+/g,'');
    this.props.commonWrite(value);
  }
  handlePublish(){
    const user_id = localStorage.getItem('user_id');
    const cookies = document.cookie.indexOf('EGG_COOK_U=');
    const com_id = this.props.match.params.id;
    if(cookies !== -1){
      if(this.props.write){
        this.props.handlePublish(user_id,com_id,this.props.write);
      } else {
        message.info('您还未评论呦')
      }
    } else {
      message.info('您还未登录，请登录再进行发表！')
    }
  }
  render() {
    const { commonList, write } = this.props;
    return (
      <div className="detal-content">
        <div className="detal-write">
          <textarea
              name="content"
              value={write}
              onChange={(e) => { this.handleWrite(e) }}
              placeholder="扯淡、吐槽、表扬、鼓励...想说啥就说啥！"
          >
          </textarea>
          <span onClick={() => { this.handlePublish() }} className="publish">
            发表评论
              </span>
        </div>
        <article className="content-list">
          {
            commonList.length === 0
            ?<p className="detal-no-data">暂无评论！</p>
            :commonList.map(item => {
              return (
                <section key={item.comment_id} className="comment-detal">
                  <img src={item.user_photo} alt="" />
                  <div className="comment-main">
                    <p className="comment-name">{item.user_name} <span className="comment-create">{item.create_time}</span></p>
                    <p className="comment-value">
                      {item.comment_value}
                    </p>
                  </div>
                </section>
              )
            })
          }
          
        </article>
      </div>
    )
  }
}

const mapState = state => ({
  commonList: state.main.commonList,
  write: state.main.write
})

const mapDispatch = dispatch => ({
  getDetail(id) {
    dispatch(getDetail(id));
  },
  commonWrite(common) {
    dispatch(commonWrite(common));
  },
  handlePublish(user_id,com_id,common){
    dispatch(handlePublish(user_id,com_id,common))
  }
})

export default connect(mapState,mapDispatch)(CommonList);

