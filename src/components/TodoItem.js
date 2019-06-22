import React, {Component} from 'react';
import './scss/TodoItem.scss';

class TodoItem extends Component{
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.todo !== this.props.todo;
  }
  handleTodoRemove = (e) => {
    const {
      todoId,
      onTodoRemove
    } = this.props;

    e.stopPropagation();
    e.preventDefault();
    onTodoRemove(todoId);
  }
  handleTodoToggle = (e) => {
    if(!this.props.onTodoToggle){
      return;
    }
    const {
      todoId,
      onTodoToggle
    } = this.props;

    e.stopPropagation();
    onTodoToggle(todoId);
  }
  render(){
    const {
      handleTodoRemove,
      handleTodoToggle
    } = this;
    const {
      isOnlyView,
      isPerform
    } = this.props;
    console.log(this.props.todoId);
    return (
      <li className={`TodoItem ${(isPerform) ? 'perform' : 'notPerform'}`} onClick={handleTodoToggle}>
        <p>{this.props.children}</p>
        {isOnlyView ? null : (<button onClick={handleTodoRemove}>Delete</button>)}
      </li>
    );
  }
}

export default TodoItem;