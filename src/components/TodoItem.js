import React, {Component} from 'react';
import './scss/TodoItem.scss';

class TodoItem extends Component{
  handleTodoRemove = (e) => {
    const {
      index,
      onTodoRemove
    } = this.props;

    e.stopPropagation();
    e.preventDefault();
    onTodoRemove(index);
  }
  handleTodoToggle = (e) => {
    if(!this.props.onTodoToggle){
      return;
    }
    const {
      index,
      onTodoToggle
    } = this.props;

    e.stopPropagation();
    onTodoToggle(index);
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
    return (
      <li className={`TodoItem ${(isPerform) ? 'perform' : 'notPerform'}`} onClick={handleTodoToggle}>
        <p>{this.props.children}</p>
        {isOnlyView ? null : (<button onClick={handleTodoRemove}>Delete</button>)}
      </li>
    );
  }
}

export default TodoItem;