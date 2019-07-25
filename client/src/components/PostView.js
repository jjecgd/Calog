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
const View = styled.div`
  box-sizing: border-box;
  padding: 2rem 0 4rem;
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  .view_area {
    height: 100%;
    padding: 0 2rem;
    overflow-y: auto;
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
  render() {
    const {
      onPostClose,
      onTodoRemove,
      onTodoToggle,
      posts,
      targetDate,
      isOwner,
      match
    } = this.props;
    const targetPosts =
      posts[targetDate.year][targetDate.month][match.params.date];
    const targetPost =
      targetPosts &&
      targetPosts.find(post => {
        return post._id === match.params.id;
      });
    const { _id, title, content, todoContent, date, modifyDate } = targetPost;
    const todoList = todoContent.map(todo => {
      return (
        <TodoItem
          key={todo.todoId}
          postId={match.params.id}
          date={match.params.date}
          todoId={todo.todoId}
          post={targetPost}
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
      <Wrap>
        <View>
          <div className="view_area">
            <h2 className="title_area">{title}</h2>
            <hr />
            <p className="date">
              작성일 :{' '}
              {`${date.year}.${date.month}.${date.date} / ${date.time}`}
            </p>
            {/*modifyDate ? (
              <p className="date">
                수정일 :{' '}
                {`${modifyDate.year}.${modifyDate.month}.${modifyDate.date} / ${modifyDate.time}`}
              </p>
            ) : null*/}

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
            {isOwner && (
              <button
                className="red"
                onClick={e => {
                  const { onPostRemove } = this.props;

                  e.stopPropagation();
                  onPostRemove(_id);
                }}
              >
                삭제
              </button>
            )}
            {isOwner && (
              <button
                className="teal"
                onClick={e => {
                  const { onPostModify } = this.props;
                  const { title, content, todoContent } = targetPost;
                  e.stopPropagation();
                  onPostModify(
                    { title, content, todoContent },
                    match.params.date,
                    match.params.id
                  );
                }}
              >
                수정
              </button>
            )}
            <button className="blue" onClick={onPostClose}>
              나가기
            </button>
          </div>
        </View>
      </Wrap>
    );
  }
}

export default PostView;
