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
      performRatio
    } = this.props;
    
    return (
      <li className="PostContent" onClick={handlePostView}>
        <div>
          <b>{title}</b>
          <hr/>
          <p>{content}</p>
          <p>수행률 {performRatio}%의 Todo list</p>
        </div>
      </li>
    );
  }
}
//content.map(item => <TodoItem key={item.todoId} isPerform={item.isPerform}>{item.todo}</TodoItem>)
export default PostContent;