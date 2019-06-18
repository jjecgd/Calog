import React, {Component} from 'react';
import PostContent from './PostContent';
import './scss/PostList.scss';

class PostList extends Component{
  render(){
    const {
      posts, 
      onWrite, 
      onRemove
    } = this.props;
    
    const postList = posts.map(
      (post) => {
        return (
          <PostContent 
            key={post.postId}
            postId={post.postId}
            postType={post.postType}
            title={post.title} 
            content={post.content} 
            onRemove={onRemove}
          />
        );
      }
    );
    return (
      <section className="PostList">
        <ul className="list_area">
          {postList}
        </ul>
        <button className="btn write" onClick={onWrite}>글 작성</button>
      </section>
    );
  }
}

export default PostList;