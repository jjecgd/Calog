import React, {Component} from 'react';
import './scss/PostWrite.scss';
import TodoItem from './TodoItem';

class PostWrite extends Component{
  handleTodoAdd = (e) => {
    const {
      onTodoAdd,
      writeForm
    } = this.props;
    const {
      todoTitle
    } = writeForm;

    e.preventDefault();
    onTodoAdd(todoTitle);
  }

  handleKeyPress = (e) => {
    const {
      onTodoAdd,
      writeForm
    } = this.props;
    const {
      todoTitle
    } = writeForm;

    if(e.key === 'Enter'){
      e.preventDefault();
      onTodoAdd(todoTitle);
    }
  }

  render(){
    const {
      handleTodoAdd,
      handleKeyPress
    } = this;
    const {
      onPostClose,
      onPostWrite,
      onPostUpload,
      onTodoRemove,
      isModify,
      writeForm
    } = this.props;
    const {
      title,
      content,
      todoTitle,
      todoContent
    } = writeForm;
    const todoList = todoContent.map(
      (item) => {
        return (<TodoItem key={item.todoId} index={item.todoId} onTodoRemove={onTodoRemove}>{item.todo}</TodoItem>);
      }
    );

    return (
      <form className="PostWrite">

        <div className="form_area">
          <input name="title" className="post_title" value={title} onChange={onPostWrite} placeholder="제목을 입력하세요."/>
          <textarea name="content" className="post_content" type="text" value={content} onChange={onPostWrite} placeholder="내용을 입력하세요."></textarea>

          <div className="todo_title_area">
            <input name="todoTitle" value={todoTitle} onChange={onPostWrite} onKeyPress={handleKeyPress} placeholder="항목을 입력하세요."/>
            <button onClick={handleTodoAdd}>Add</button>
          </div>

          <ul className="todo_content_area">
            {todoList}
          </ul>
        </div>

        <div className="btn_group">
          <button className="btn cancel" onClick={onPostClose}>취소</button>
          <button className="btn write" onClick={onPostUpload}>{isModify ? '수정완료' : '게시'}</button>
        </div>
      </form>
    );
  }
}

export default PostWrite;