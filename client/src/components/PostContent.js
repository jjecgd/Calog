import React, { Component } from 'react';
import styled from 'styled-components';

const Post = styled.li`
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  vertical-align: top;
  cursor: pointer;
  padding: 1rem;
  width: 300px;
  margin: 1rem;
  background: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  .title {
    font-weight: bold;
    color: #212529;
  }
  hr {
    margin: 0.6rem 0;
    width: 100%;
    height: 1px;
    border: none;
    background: #dee2e6;
  }
  .upload_date {
    text-align: right;
    color: #868e96;
    font-size: 0.9rem;
  }
  .content {
    margin: 0.6rem 0;
    height: 1.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #212529;
    overflow: hidden;
  }
  .perform_ratio {
    font-weight: bold;
    font-size: 0.9rem;
    color: #495057;
    span {
      color: #c92a2a;
    }
  }
`;

class PostContent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.post !== this.props.post;
  }
  handlePostRemove = e => {
    const { _id, onPostRemove } = this.props;

    e.stopPropagation();
    onPostRemove(_id);
  };
  handlePostView = e => {
    const { _id, onPostView } = this.props;

    e.stopPropagation();
    onPostView(_id);
  };
  render() {
    const { handlePostView } = this;
    const { title, content, todoContent, date, modifyDate } = this.props;
    const count = todoContent.reduce((a, todo) => {
      if (todo.isPerform) return ++a;
      else return a;
    }, 0);
    const performRatio = ((count / todoContent.length) * 100).toFixed(0);

    return (
      <Post className="PostContent" onClick={handlePostView}>
        <div>
          <b className="title">{title}</b>
          <hr />
          <p className="upload_date">{`${date.year}.${date.month}.${date.date} / ${date.time}`}</p>
          {modifyDate ? (
            <p className="upload_date">
              수정 :{' '}
              {`${modifyDate.year}.${modifyDate.month}.${modifyDate.date} / ${modifyDate.time}`}
            </p>
          ) : null}
          <p className="content">{content}</p>
          {todoContent.length > 0 ? (
            <p className="perform_ratio">
              수행률 <span>{performRatio}%</span>의 Todo list
            </p>
          ) : null}
        </div>
      </Post>
    );
  }
}
//content.map(item => <TodoItem key={item.todoId} isPerform={item.isPerform}>{item.todo}</TodoItem>)
export default PostContent;
