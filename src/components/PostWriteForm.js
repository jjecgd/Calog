import React, {Component} from 'react';
import './scss/PostWriteForm.scss';
import PostWriteFormNormal from './PostWriteFormNormal';
import PostWriteFormTodo from './PostWriteFormTodo';

class PostWriteForm extends Component{
  render(){
    const {
      onChangeForm,
      onWriteModeChange,
      onAddTodo,
      onRemoveTodo,
      onPost,
      onCancel,
      writeForm,
      writeMode
    } = this.props;

    const {
      title,
      content
    } = writeForm;

    const {
      normal,
      todo
    } = writeMode

    return (
      <form className="PostWriteForm">
        <div className="type_area">
          <button name="normal" className={normal ? 'on' : ''} onClick={onWriteModeChange}>일반포스팅</button>
          <button name="todo" className={todo ? 'on' : ''} onClick={onWriteModeChange}>TodoList</button>
        </div>
        {
          (function(){
            if(normal){
              return (
                <PostWriteFormNormal
                  title={title}
                  content={content}
                  onChangeForm={onChangeForm}
                />
              );
            }else if(todo){
              return (
                (
                  <PostWriteFormTodo
                    title={title}
                    content={content}
                    onChangeForm={onChangeForm}
                    onAddTodo={onAddTodo}
                    onRemoveTodo={onRemoveTodo}
                  />
                )
              );
            }
          })()
        }
        <div className="btn_group">
          <button className="btn cancel" onClick={onCancel}>취소</button>
          <button className="btn write" onClick={onPost}>게시</button>
        </div>
      </form>
    );
  }
}

export default PostWriteForm;