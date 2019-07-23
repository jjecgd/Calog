import React, { Component } from 'react';
import styled from 'styled-components';

import PostContent from './PostContent';

const List = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
`;

class PostList extends Component {
  render() {
    const { onPostRemove, onPostView, posts } = this.props;
    console.log(posts);
    const postArray =
      posts &&
      posts.map(post => {
        return (
          <PostContent
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
      <List>
        <ul>{postArray}</ul>
      </List>
    );
  }
}

export default PostList;
