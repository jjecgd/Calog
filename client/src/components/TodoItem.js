import React, {Component} from 'react';
import axios from 'axios';
import './scss/TodoItem.scss';

class TodoItem extends Component{
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.isPerform !== this.props.isPerform){
      const post = {
        todoContent : nextProps.post.todoContent
      }
      axios.put('/api/post/checkTodo/' + nextProps.viewPostId, post)
        .then(res => {
          console.log(res);
        }); 
    }
    return nextProps.todo !== this.props.todo;
  }
  componentDidMount(){
    
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

    return (
      <li className={`TodoItem ${(isPerform) ? 'perform' : 'notPerform'}`} onClick={handleTodoToggle}>
        <p>{this.props.children}</p>
        {isOnlyView ? null : (<button onClick={handleTodoRemove}>Delete</button>)}
      </li>
    );
  }
}

export default TodoItem;