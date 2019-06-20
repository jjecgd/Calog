import React, {Component} from 'react';
import './scss/PostView.scss';
import TodoItem from './TodoItem';

class PostView extends Component{
  handlePostRemove = (e) => {
    const { 
      onPostRemove,
      viewPostId
    } = this.props;

    e.stopPropagation();
    onPostRemove(viewPostId);
  }
  handlePostModify = (e) => {
    const {
      onPostModify,
      viewPostId,
      post
    } = this.props;
    const {
      title,
      content,
      todoContent
    } = post;
    e.stopPropagation();
    onPostModify({title, content, todoContent}, viewPostId);
  }
  render(){
    const {
      handlePostRemove,
      handlePostModify
    } = this;
    const {
      onPostClose,
      onTodoRemove,
      onTodoToggle,
      post
    } = this.props;
    const {
      title,
      content,
      todoContent
    } = post;

    let todoList = undefined;

    todoList = todoContent.map(
      (item) => {
        return (<TodoItem key={item.todoId} index={item.todoId} isOnlyView={true} isPerform={item.isPerform} onTodoRemove={onTodoRemove} onTodoToggle={onTodoToggle}>{item.todo}</TodoItem>);
      }
    );

    return(
      <div className="PostView">
        <h2 className="title_area">{title}</h2>
        <p className="content_area">{content}</p>
        
        <ul className="todo_content_area">
          {todoList}
        </ul>

        <div className="btn_group">
          <button className="btn remove" onClick={handlePostRemove}>삭제</button>
          <button className="btn modify" onClick={handlePostModify}>수정</button>
          <button className="btn cancel" onClick={onPostClose}>나가기</button>
        </div>
      </div>
    );
  }
}

export default PostView;