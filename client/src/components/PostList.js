import React, { Component } from 'react';
import styled from 'styled-components';

import PostItem from './PostItem';

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
  .btn_group {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;
const List = styled.div`
  box-sizing: border-box;
  position: relative;
  padding: 1rem;
  width: 100%;
  height: 100%;
  background: #f1f3f5;
  overflow-y: auto;
`;

class PostList extends Component {
  componentDidMount() {
    this.ifPostNotExist();
  }
  componentDidUpdate(prevProps, prevState) {
    this.ifPostNotExist();
  }
  ifPostNotExist() {
    const {
      getPostExist,
      userId,
      targetDate,
      status,
      match,
      history
    } = this.props;

    if (!getPostExist(targetDate.year, targetDate.month, match.params.date)) {
      status === 'SUCCESS' && history.replace(`/calogs/${userId}`);
    }
  }
  render() {
    const {
      getPostExist,
      onGoBack,
      onPostRemove,
      onPostView,
      posts,
      match,
      targetDate
    } = this.props;
    const postArray =
      getPostExist(targetDate.year, targetDate.month, match.params.date) &&
      posts[targetDate.year][targetDate.month][match.params.date].map(post => {
        return (
          <PostItem
            onPostRemove={onPostRemove}
            onPostView={onPostView}
            title={post.title}
            content={post.content}
            todoContent={post.todoContent}
            date={post.date}
            modifyDate={post.modifyDate}
            key={post._id}
            _id={post._id}
            post={post}
          />
        );
      });
    return (
      <Wrap>
        <List>
          <ul>{postArray}</ul>
        </List>
        <div className="btn_group">
          <button className="blue" onClick={onGoBack}>
            나가기
          </button>
        </div>
      </Wrap>
    );
  }
}

export default PostList;
