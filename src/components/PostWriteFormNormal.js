import React, {Component} from 'react';
import './scss/PostWriteFormNormal.scss';

class PostWriteFormNormal extends Component{
  render(){
    const {
      title,
      content,
      onChangeForm
    } = this.props;

    return (
      <div className="PostWriteFormNormal Form_area">
        <input name="title" value={title} onChange={onChangeForm} placeholder="제목을 입력하세요."/>
        <textarea name="content" type="text" value={content} onChange={onChangeForm} placeholder="내용을 입력하세요."></textarea>
      </div>
    );
  }
}

export default PostWriteFormNormal;