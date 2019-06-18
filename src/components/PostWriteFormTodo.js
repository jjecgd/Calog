import React, {Component} from 'react';
import './scss/PostWriteFormTodo.scss';
import TodoItem from './TodoItem';

class PostWriteFormTodo extends Component{
  todoId = 0;
  handleAddTodo = (e) => {
    e.preventDefault();
    const {
      title, 
      onAddTodo
    } = this.props;
    onAddTodo(title, this.todoId++);
  }

  handleKeyPress = (e) => {
    const {
      title, 
      onAddTodo
    } = this.props;

    if(e.key === 'Enter'){
      e.preventDefault();
      onAddTodo(title, this.todoId++);
    }
  }

  render(){
    const {
      handleAddTodo,
      handleKeyPress
    } = this;
    const {
      title,
      content,
      onRemoveTodo,
      onChangeForm
    } = this.props;
    const todoList = content.map(
      (item) => {
        return (<TodoItem key={item.todoId} index={item.todoId} isOnlyView={false} onRemoveTodo={onRemoveTodo}>{item.todo}</TodoItem>);
      }
    );

    return (
      <div className="PostWriteFormTodo Form_area">
        <div className="title_area">
          <input name="title" value={title} onChange={onChangeForm} onKeyPress={handleKeyPress} placeholder="항목을 입력하세요."/>
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul className="content_area">
          {todoList}
        </ul>
      </div>
    );
  }
}

export default PostWriteFormTodo;