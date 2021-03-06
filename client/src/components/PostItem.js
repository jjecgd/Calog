import React, { Component } from 'react';
import styled from 'styled-components';

const Post = styled.li`
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  vertical-align: top;
  cursor: pointer;
  padding: 1rem;
  width: 100%;
  background: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  & + & {
    margin-top: 1rem;
  }
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

class PostItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.post !== this.props.post;
  }
  render() {
    const { title, content, todoContent, date } = this.props;
    const count = todoContent.reduce((a, todo) => {
      if (todo.isPerform) return ++a;
      else return a;
    }, 0);
    const performRatio = ((count / todoContent.length) * 100).toFixed(0);

    return (
      <Post
        onClick={e => {
          const { _id, onPostView } = this.props;

          e.stopPropagation();
          onPostView(_id, date.date);
        }}
      >
        <div>
          <b className="title">{title}</b>
          <hr />
          <p className="upload_date">{`작성일 : ${date.year}.${date.month}.${date.date} / ${date.time}`}</p>
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
export default PostItem;
