import React, {Component} from 'react';
import PostContent from './PostContent';
import './scss/PostList.scss';

class PostList extends Component{
  render(){
    const {
      onPostStart, 
      onPostRemove,
      onPostView,
      posts
    } = this.props;
    
    const postList = posts.map(
      (post) => {
        return (
          <PostContent 
            onPostRemove={onPostRemove}
            onPostView={onPostView}
            title={post.title} 
            content={post.content}
            todoContent={post.todoContent}
            date={post.date}
            modifyDate={post.modifyDate}
            key={post.postId}
            postId={post.postId}
            performRatio={post.performRatio}
          />
        );
      }
    );
    return (
      <section className="PostList">
        <ul className="list_area">
          {postList}
        </ul>
        <button className="btn write" onClick={onPostStart}>글 작성</button>
      </section>
    );
  }
}

export default PostList;