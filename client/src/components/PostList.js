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
  shouldComponentUpdate(nextProps, nextState) {
    const { userId, targetDate, match, history } = this.props;
    const { posts } = nextProps;
    if (
      !posts[targetDate.year] ||
      !posts[targetDate.year][targetDate.month] ||
      !posts[targetDate.year][targetDate.month][match.params.date]
    ) {
      history.replace(`/calogs/${userId}`);
    }
    return true;
  }
  render() {
    const { onPostRemove, onPostView, posts, match, targetDate } = this.props;

    const postArray =
      posts[targetDate.year] &&
      posts[targetDate.year][targetDate.month] &&
      posts[targetDate.year][targetDate.month][match.params.date] &&
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
      </Wrap>
    );
  }
}

export default PostList;
