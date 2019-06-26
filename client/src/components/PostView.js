import React, {Component} from 'react';
import './scss/PostView.scss';
import TodoItem from './TodoItem';

class PostView extends Component{
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.post !== this.props.post;
  }
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
      post,
      viewPostId
    } = this.props;
    const {
      title,
      content,
      todoContent,
      date,
      modifyDate
    } = post;
    const todoList = todoContent.map(
      (todo) => {
        return (<TodoItem key={todo.todoId} todoId={todo.todoId} post={post} viewPostId={viewPostId} isOnlyView={true} isPerform={todo.isPerform} onTodoRemove={onTodoRemove} onTodoToggle={onTodoToggle} todo={todo}>{todo.todo}</TodoItem>);
      }
    );
    const count = todoContent.reduce((a, todo) => {
      if(todo.isPerform) return ++a;
      else return a;
    }, 0);
    const performRatio = ((count / todoContent.length) * 100).toFixed(0);
    
    return(
      <div className="PostView">
        <div className="view_area">
          <h2 className="title_area">{title}</h2>
          <hr/>
          <p className="date">작성일 : {date}</p>
          {modifyDate ? <p className="date">수정일 : {modifyDate}</p> : null}

          {
            content 
            ? <div>
                <p className="content_area">{content}</p>
                <hr/>
              </div>
            : null
          }
            
          {
            todoContent.length === 0
            ? null
            : <div>
                <p className="perform_ratio">오늘 할 일의 <span>{performRatio}%</span>를 수행하셨군요!</p>
                <ul className="todo_content_area">
                  {todoList}
                </ul>
              </div>
          }
        </div>

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