import React, {Component} from 'react';
import './scss/PostContent.scss';
import TodoItem from './TodoItem';

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
      handlePostRemove,
      handlePostView
    } = this;
    const {
      title, 
      content,
      postType,
      performRatio
    } = this.props;
    
    return (
      <li className="PostContent" onClick={handlePostView}>
        {
          (function(){
            if(postType === 'normal'){
              return (
                <div>
                  <b>{title}</b>
                  <hr/>
                  <p>{content}</p>
                </div>
              );
            }else if(postType === 'todo'){
              return (
                <div>
                  <p>수행률 {performRatio}%의 Todo list</p>
                  <ul className="todo">
                    {
                      (function(){
                        return content.map(item => <TodoItem key={item.todoId} isPerform={item.isPerform}>{item.todo}</TodoItem>)
                      })()
                    }
                  </ul>
                </div>
              );
            }
          })()
        }
        
        <button className="btn remove" onClick={handlePostRemove}>삭제</button>
      </li>
    );
  }
}

export default PostContent;