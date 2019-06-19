import React, {Component} from 'react';
import './scss/TodoItem.scss';

class TodoItem extends Component{
  handleRemoveTodo = (e) => {
    const {
      index,
      onRemoveTodo
    } = this.props;

    e.stopPropagation();
    e.preventDefault();
    onRemoveTodo(index);
  }
  handleToggleTodo = (e) => {
    if(!this.props.onToggleTodo){
      return;
    }
    const {
      index,
      onToggleTodo
    } = this.props;

    e.stopPropagation();
    onToggleTodo(index);
  }
  render(){
    const {
      handleRemoveTodo,
      handleToggleTodo
    } = this;
    const {
      isOnlyView,
      isPerform
    } = this.props;
    return (
      <li className={`TodoItem ${(isPerform) ? 'perform' : 'notPerform'}`} onClick={handleToggleTodo}>
        <p>{this.props.children}</p>
        {isOnlyView ? null : (<button onClick={handleRemoveTodo}>Delete</button>)}
      </li>
    );
  }
}

export default TodoItem;