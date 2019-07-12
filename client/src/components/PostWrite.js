import React, { Component } from 'react';
import styled from 'styled-components';

import TodoItem from './TodoItem';

const Write = styled.div`
  box-sizing: border-box;
  position: absolute;
  padding: 50px 40px;
  top: 50%;
  left: 50%;
  margin: -400px 0 0 -550px;
  width: 1100px;
  height: 800px;
  background: #fff;
  .form_area {
    height: 100%;
    overflow-y: auto;
    .post_title {
      box-sizing: border-box;
      padding: 0.5rem;
      margin-bottom: 20px;
      width: 100%;
      height: 40px;
      border: 1px solid #dee2e6;
    }
    .post_content {
      box-sizing: border-box;
      padding: 0.5rem;
      margin-bottom: 20px;
      width: 100%;
      height: 300px;
      resize: none;
      border: 1px solid #dee2e6;
    }
    .todo_title_area {
      width: 100%;
      height: 40px;
      input {
        box-sizing: border-box;
        display: inline-block;
        padding: 0.5rem;
        width: calc(100% - 60px);
        height: 100%;
        border: 1px solid #dee2e6;
        border-right: none;
        vertical-align: top;
      }
      button {
        display: inline-block;
        width: 60px;
        height: 100%;
        background: #66a80f;
        border: none;
        color: #fff;
        vertical-align: top;
      }
    }
    .todo_content_area {
      box-sizing: border-box;
      width: 100%;
      list-style: none;
      overflow-y: auto;
      .TodoItem {
        &.notPerform,
        &.perform {
          background: none;
        }
        &:nth-child(odd) {
          background: #f1f3f5;
        }
      }
    }
  }
  .btn_group {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;

class PostWrite extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.writeForm !== this.props.writeForm;
  }
  handleTodoAdd = e => {
    const { onTodoAdd, writeForm } = this.props;
    const { todoTitle } = writeForm;

    e.preventDefault();
    onTodoAdd(todoTitle);
  };
  handleKeyPress = e => {
    const { onTodoAdd, writeForm } = this.props;
    const { todoTitle } = writeForm;

    if (e.key === 'Enter') {
      e.preventDefault();
      onTodoAdd(todoTitle);
    }
  };
  render() {
    const { handleTodoAdd, handleKeyPress } = this;
    const {
      onPostClose,
      onChange,
      onPostUpload,
      onTodoRemove,
      popupMode,
      writeForm
    } = this.props;
    const { title, content, todoTitle, todoContent } = writeForm;
    const todoList = todoContent.map(item => {
      return (
        <TodoItem
          key={item.todoId}
          todoId={item.todoId}
          onTodoRemove={onTodoRemove}
        >
          {item.todo}
        </TodoItem>
      );
    });

    return (
      <Write>
        <div className="form_area">
          <input
            name="title"
            className="post_title"
            value={title}
            onChange={onChange}
            placeholder="제목을 입력하세요."
          />
          <textarea
            name="content"
            className="post_content"
            type="text"
            value={content}
            onChange={onChange}
            placeholder="내용을 입력하세요."
          ></textarea>

          <div className="todo_title_area">
            <input
              name="todoTitle"
              value={todoTitle}
              onChange={onChange}
              onKeyPress={handleKeyPress}
              placeholder="항목을 입력하세요."
            />
            <button onClick={handleTodoAdd}>Add</button>
          </div>

          <ul className="todo_content_area">{todoList}</ul>
        </div>

        <div className="btn_group">
          <button className="red" onClick={onPostClose}>
            취소
          </button>
          <button className="orange" onClick={onPostUpload}>
            {popupMode === 'modify' ? '수정완료' : '게시'}
          </button>
        </div>
      </Write>
    );
  }
}

export default PostWrite;
