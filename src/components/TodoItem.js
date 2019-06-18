import React, {Component} from 'react';
import './scss/TodoItem.scss';

class TodoItem extends Component{
  handleRemoveTodo = (e) => {
    e.preventDefault();
    const {
      index,
      onRemoveTodo
    } = this.props;
    onRemoveTodo(index);
  }
  render(){
    const {
      handleRemoveTodo
    } = this;
    const {
      isOnlyView,
      isPerform
    } = this.props;
    return (
      <li className={`TodoItem ${(isPerform && isOnlyView) ? 'perform' : 'notPerform'}`}>
        <p>{this.props.children}</p>
        {isOnlyView ? null : (<button onClick={handleRemoveTodo}>Delete</button>)}
      </li>
    );
  }
}

export default TodoItem;