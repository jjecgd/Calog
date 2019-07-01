import React, { Component } from 'react';
import styled from 'styled-components';

import PostContent from './PostContent';

const List = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 100%;
`;

const WriteBtn = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`;

class PostList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.posts !== this.props.posts;
  }
  render() {
    const { onPostStart, onPostRemove, onPostView, posts } = this.props;
    const postArray = posts.map(post => {
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
      <div>
        <List className="list_area">{postArray}</List>
        <WriteBtn className="orange" onClick={onPostStart}>
          글 작성
        </WriteBtn>
      </div>
    );
  }
}

export default PostList;
