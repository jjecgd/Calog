import React, {Component} from 'react';
import './scss/PostContent.scss';
import TodoItem from './TodoItem';

class PostContent extends Component{
  handleRemove = () => {
    const {
      postId, 
      onRemove
    } = this.props;
    onRemove(postId);
  }
  render(){
    const {
      title, 
      content,
      postType
    } = this.props;
    let cnt = 0, todoPerformRate = 0;

    if(postType === 'todo'){
      content.forEach(item => {
        if(item.isPerform){
          cnt++;
        }
      });
      todoPerformRate = (cnt / content.length) * 100
    }
    
    return (
      <li className="PostContent">
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
                  <p>{todoPerformRate}</p>
                  <ul className="todo">
                    {
                      (function(){
                        return content.map(item => <TodoItem key={item.todoId} isOnlyView={true} isPerform={item.isPerform}>{item.todo}</TodoItem>)
                      })()
                    }
                  </ul>
                </div>
              );
            }
          })()
        }
        
        <button className="btn remove" onClick={this.handleRemove}>삭제</button>
      </li>
    );
  }
}

export default PostContent;