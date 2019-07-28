import React, { Component } from 'react';
import styled from 'styled-components';

import TodoItem from './TodoItem';

const Wrap = styled.div`
  z-index: 2;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 4rem;
  overflow: hidden;
`;
const Write = styled.div`
  box-sizing: border-box;
  padding: 2rem 0 4rem;
  position: relative;
  width: 100%;
  height: 100%;
  background: #f1f3f5;
  .form_area {
    padding: 0 2rem;
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
  componentDidMount() {
    this.loadPost();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.writeForm !== this.props.writeForm ||
      nextProps.status !== this.props.status
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const { status } = this.props;

    if (prevProps.status !== status && status === 'SUCCESS') {
      this.loadPost();
    }
  }
  loadPost() {
    const {
      onPostModify,
      getPostExist,
      userId,
      mode,
      status,
      posts,
      match,
      history
    } = this.props;
    if (mode === 'modify' && status === 'SUCCESS') {
      const { id, year, month, date } = match.params;
      const isPostExist = getPostExist(year, month, date);
      const postData =
        isPostExist && posts[year][month][date].find(post => post._id === id);
      if (postData) {
        onPostModify({
          title: postData.title,
          content: postData.content,
          todoTitle: '',
          todoContent: postData.todoContent
        });
      } else {
        history.replace(`/calogs/${userId}`);
      }
    }
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
      onGoBack,
      onChange,
      onPostUpload,
      onTodoRemove,
      mode,
      writeForm,
      match
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
      <Wrap>
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
            <button className="red" onClick={onGoBack}>
              취소
            </button>
            <button
              className="orange"
              onClick={
                mode === 'modify'
                  ? e => {
                      e.preventDefault();
                      onPostUpload(match.params.id);
                    }
                  : onPostUpload
              }
            >
              {mode === 'modify' ? '수정완료' : '게시'}
            </button>
          </div>
        </Write>
      </Wrap>
    );
  }
}

export default PostWrite;
