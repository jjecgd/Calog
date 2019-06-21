import React, {Component} from 'react';
import './scss/PostContent.scss';

class PostContent extends Component{
  handlePostRemove = (e) => {
    const {
      postId, 
      onPostRemove
    } = this.props;

    e.stopPropagation();
    onPostRemove(postId);
  }

  handlePostView = (e) => {
    const {
      postId,
      onPostView
    } = this.props;

    e.stopPropagation();
    onPostView(postId);
  }

  render(){
    const {
      handlePostView
    } = this;
    const {
      title, 
      content,
      todoContent,
      date,
      modifyDate,
      performRatio
    } = this.props;
    console.log(modifyDate);

    return (
      <li className="PostContent" onClick={handlePostView}>
        <div>
          <b className="title">{title}</b>
          <hr/>
          <p className="upload_date">{date}</p>
          <p className="content">{content}</p>
          {todoContent.length > 0 ? <p className="perform_ratio">수행률 <span>{performRatio}%</span>의 Todo list</p> : null}
        </div>
      </li>
    );
  }
}
//content.map(item => <TodoItem key={item.todoId} isPerform={item.isPerform}>{item.todo}</TodoItem>)
export default PostContent;