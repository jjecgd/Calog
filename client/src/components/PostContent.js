import React, {Component} from 'react';
import './scss/PostContent.scss';

class PostContent extends Component{
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.post !== this.props.post;
  }
  handlePostRemove = (e) => {
    const {
      _id, 
      onPostRemove
    } = this.props;

    e.stopPropagation();
    onPostRemove(_id);
  }
  handlePostView = (e) => {
    const {
      _id,
      onPostView
    } = this.props;

    e.stopPropagation();
    onPostView(_id);
  }
  render(){
    const {
      handlePostView
    } = this;
    const {
      title, 
      content,
      todoContent,
      date,
      modifyDate,
    } = this.props;
    const count = todoContent.reduce((a, todo) => {
      if(todo.isPerform) return ++a;
      else return a;
    }, 0);
    const performRatio = ((count / todoContent.length) * 100).toFixed(0);

    return (
      <li className="PostContent" onClick={handlePostView}>
        <div>
          <b className="title">{title}</b>
          <hr/>
          <p className="upload_date">{date}</p>
          {modifyDate ? <p className="upload_date">수정 : {modifyDate}</p> : null}
          <p className="content">{content}</p>
          {todoContent.length > 0 ? <p className="perform_ratio">수행률 <span>{performRatio}%</span>의 Todo list</p> : null}
        </div>
      </li>
    );
  }
}
//content.map(item => <TodoItem key={item.todoId} isPerform={item.isPerform}>{item.todo}</TodoItem>)
export default PostContent;