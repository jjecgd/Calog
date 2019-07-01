import React, { Component } from 'react';
import styled from 'styled-components';

import TodoItem from './TodoItem';

const View = styled.div`
  box-sizing: border-box;
  position: absolute;
  padding: 50px 40px;
  top: 50%;
  left: 50%;
  margin: -400px 0 0 -550px;
  width: 1100px;
  height: 800px;
  background: #fff;
  .view_area {
    height: 100%;
    overflow-y: auto;
    hr {
      margin: 1rem 0;
      width: 100%;
      height: 1px;
      border: none;
      background: #dee2e6;
    }
    .title_area {
      box-sizing: border-box;
      margin-bottom: 20px;
      width: 100%;
      font-size: 2rem;
    }
    .date {
      text-align: right;
      color: #868e96;
      font-size: 0.9rem;
    }
    .content_area {
      box-sizing: border-box;
      width: 100%;
    }
    .perform_ratio {
      span {
        color: #c92a2a;
      }
    }
    .todo_content_area {
      box-sizing: border-box;
      margin-top: 1rem;
      width: 100%;
      list-style: none;
      overflow-y: auto;
      .TodoItem {
        cursor: pointer;
      }
    }
  }
  .btn_group {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;

class PostView extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.post !== this.props.post;
  }
  handlePostRemove = e => {
    const { onPostRemove, viewPostId } = this.props;

    e.stopPropagation();
    onPostRemove(viewPostId);
  };
  handlePostModify = e => {
    const { onPostModify, viewPostId, post } = this.props;
    const { title, content, todoContent } = post;
    e.stopPropagation();
    onPostModify({ title, content, todoContent }, viewPostId);
  };
  render() {
    const { handlePostRemove, handlePostModify } = this;
    const {
      onPostClose,
      onTodoRemove,
      onTodoToggle,
      post,
      viewPostId
    } = this.props;
    const { title, content, todoContent, date, modifyDate } = post;
    const todoList = todoContent.map(todo => {
      return (
        <TodoItem
          key={todo.todoId}
          todoId={todo.todoId}
          post={post}
          viewPostId={viewPostId}
          isOnlyView={true}
          isPerform={todo.isPerform}
          onTodoRemove={onTodoRemove}
          onTodoToggle={onTodoToggle}
          todo={todo}
        >
          {todo.todo}
        </TodoItem>
      );
    });
    const count = todoContent.reduce((a, todo) => {
      if (todo.isPerform) return ++a;
      else return a;
    }, 0);
    const performRatio = ((count / todoContent.length) * 100).toFixed(0);

    return (
      <View>
        <div className="view_area">
          <h2 className="title_area">{title}</h2>
          <hr />
          <p className="date">작성일 : {date}</p>
          {modifyDate ? <p className="date">수정일 : {modifyDate}</p> : null}

          {content ? (
            <div>
              <p className="content_area">{content}</p>
              <hr />
            </div>
          ) : null}

          {todoContent.length === 0 ? null : (
            <div>
              <p className="perform_ratio">
                오늘 할 일의 <span>{performRatio}%</span>를 수행하셨군요!
              </p>
              <ul className="todo_content_area">{todoList}</ul>
            </div>
          )}
        </div>

        <div className="btn_group">
          <button className="red" onClick={handlePostRemove}>
            삭제
          </button>
          <button className="teal" onClick={handlePostModify}>
            수정
          </button>
          <button className="blue" onClick={onPostClose}>
            나가기
          </button>
        </div>
      </View>
    );
  }
}

export default PostView;
