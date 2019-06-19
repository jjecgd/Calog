import React, {Component} from 'react';
import PostContent from './PostContent';
import './scss/PostList.scss';

class PostList extends Component{
  render(){
    const {
      posts, 
      onWrite, 
      onPostRemove,
      onPostView
    } = this.props;
    
    const postList = posts.map(
      (post) => {
        return (
          <PostContent 
            key={post.postId}
            postId={post.postId}
            postType={post.postType}
            performRatio={post.performRatio}
            title={post.title} 
            content={post.content} 
            onPostRemove={onPostRemove}
            onPostView={onPostView}
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