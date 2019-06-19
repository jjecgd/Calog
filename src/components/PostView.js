import React, {Component, Fragment} from 'react';
import './scss/PostView.scss';
import TodoItem from './TodoItem';

class PostView extends Component{
  render(){
    const {
      post,
      onRemoveTodo,
      onToggleTodo,
      onCancel
    } = this.props;
    const {
      postType,
      title,
      content
    } = post;

    let todoList = undefined;

    if(postType === 'todo'){
      todoList = content.map(
        (item) => {
          return (<TodoItem key={item.todoId} index={item.todoId} isPerform={item.isPerform} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo}>{item.todo}</TodoItem>);
        }
      );
    }

    return(
      <div className="PostView">
        {
          (() => {
            if(postType === 'normal'){
              return (
                <Fragment>
                  <b className="title_area">{title}</b>
                  <p className="content_area">{content}</p>
                </Fragment>
              );
            }else if(postType === 'todo'){
              return (
                <ul className="content_area">
                  {todoList}
                </ul>
              );
            }
          })()
        }
        <div className="btn_group">
          <button className="btn cancel" onClick={onCancel}>나가기</button>
        </div>
      </div>
    );
  }
}

export default PostView;