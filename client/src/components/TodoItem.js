import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Item = styled.li`
  position: relative;
  box-sizing: border-box;
  padding: 0.3rem 60px 0.3rem 0.3rem;
  width: 100%;
  background: #f8f9fa;
  cursor: pointer;
  & + & {
    margin-top: 1px;
  }
  &:nth-child(odd) {
    background: #fff;
  }
  p {
    display: inline-block;
    vertical-align: top;
    line-height: 1.5rem;
  }
  button {
    position: absolute;
    display: inline-block;
    top: 0;
    right: 0;
    vertical-align: top;
    width: 60px;
    height: 100%;
    background: #f03e3e;
    color: #fff;
    border: none;
    outline: none;
  }
  &.notPerform {
    background: #ffc9c9;
  }
  &.perform {
    background: #b2f2bb;
  }
`;

class TodoItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isPerform !== this.props.isPerform) {
      const post = {
        todoContent: nextProps.post.todoContent
      };
      axios
        .put('/api/post/checkTodo/' + nextProps.viewPostId, post)
        .then(res => {});
    }
    return nextProps.todo !== this.props.todo;
  }
  componentDidMount() {}
  handleTodoRemove = e => {
    const { todoId, onTodoRemove } = this.props;

    e.stopPropagation();
    e.preventDefault();
    onTodoRemove(todoId);
  };
  handleTodoToggle = e => {
    if (!this.props.onTodoToggle) {
      return;
    }
    const { todoId, onTodoToggle } = this.props;

    e.stopPropagation();
    onTodoToggle(todoId);
  };
  render() {
    const { handleTodoRemove, handleTodoToggle } = this;
    const { isOnlyView, isPerform } = this.props;

    return (
      <Item
        className={isPerform ? 'perform' : 'notPerform'}
        onClick={handleTodoToggle}
      >
        <p>{this.props.children}</p>
        {isOnlyView ? null : <button onClick={handleTodoRemove}>Delete</button>}
      </Item>
    );
  }
}

export default TodoItem;
