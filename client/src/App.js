import React, {Component} from 'react';
import moment from 'moment';
import produce from 'immer';
import axios from 'axios';

import PostList from './components/PostList';
import PostWrite from './components/PostWrite';
import PostView from './components/PostView';

import './App.scss';

/* state.posts의 구조
posts -- postId
       - title
       - content
       - todoContent -- todoId
       - date         - todo
       - modifyDate   - isPerform

*/
class App extends Component{
  state = {
    popupMode : '',
    writeForm : { // 글쓰기 폼에 입력된 데이터
      title : '',
      content : '',
      todoTitle : '',
      todoContent : []
    },
    viewPostIndex : -1,
    viewPostId : -1,
    modifyPostIndex : -1,
    modifyPostId : -1,
    posts : [],
    username : ''
  }

  componentDidMount(){
    this.getApi();
  }
  async getApi(){
    let {data:posts} = await axios.get('/api/post/');
    this.setState({posts});
  }
  initState = () => { // 글쓰기 취소, 포스팅 시에 State 초기화
    this.setState({
      popupMode : '',
      writeForm : {
        title : '',
        content : '',
        todoTitle : '',
        todoContent : []
      },
      viewPostIndex : -1,
      viewPostId : -1,
      modifyPostIndex : -1,
      modifyPostId : -1
    });
    this.getApi();
  }
  getDateNow = () => { // 현재 날짜 / 시각 받아오기
    return moment().format('YYYY-MM-DD [/] h:mm:ss A');
  }
  handlePostClose = (e) => { // 글쓰기 / 글보기 닫음
    e.preventDefault();
    this.initState();
  }
  handlePostStart = () => { // 글쓰기 버튼 클릭
    this.setState({
      popupMode : 'write'
    });
  }
  handlePostUpload = (e) => { // 포스팅
    e.preventDefault();
    const {posts} = this.state;
    const {title, content, todoContent} = this.state.writeForm;
    const date = this.getDateNow();

    const post = {
      title : title,
      content : content,
      todoContent : todoContent,
      date : date,
      modifyDate : undefined
    }

    if(title === ''){
      alert('제목을 입력해주세요.');
      return;
    }
    if(content === '' && todoContent.length === 0){
      alert('내용 또는 TodoList 항목을 추가해주세요.');
      return;
    }
    axios.post('/api/post/upload', post)
      .then(res => {
        console.log(res);
        this.initState();
      });
  }
  handlePostRemove = (_id) => { // 포스트 삭제
    axios.delete('/api/post/delete/' + _id)
      .then(res => {
        console.log(res);
        this.initState();
      });
  }
  handlePostWrite = (e) => { // 글쓰기 폼에서 입력
    const {writeForm} = this.state;

    this.setState({
      writeForm : {
        ...writeForm,
        [e.target.name] : e.target.value
      }
    });
  }
  handlePostView = (_id) => { // 글 보기
    const {posts} = this.state;

    this.setState({
      popupMode : 'view',
      viewPostIndex : posts.findIndex((post) => post._id === _id),
      viewPostId : _id
    });
  }
  handlePostModify = (before, _id) => { // 글 수정 시작
    const {writeForm, posts} = this.state;
    
    this.initState();
    this.setState({
      popupMode : 'modify',
      writeForm : {
        ...writeForm,
        ...before
      },
      modifyPostIndex : posts.findIndex(post => post._id === _id),
      modifyPostId : _id
    });
  }
  handlePostModifyUpload = (e) => { // 글 수정 완료
    e.preventDefault();
    const {modifyPostId} = this.state;
    const {title, content, todoContent} = this.state.writeForm;

    if(title === ''){
      alert('제목을 입력해주세요.');
      return;
    }
    if(content === '' && todoContent.length === 0){
      alert('내용 또는 TodoList 항목을 추가해주세요.');
      return;
    }
    const post = {
      title : title,
      content : content,
      todoContent : todoContent,
      modifyDate : this.getDateNow()
    }
    axios.put('/api/post/modify/' + modifyPostId, post)
      .then(res => {
        console.log(res);
        this.initState();
      });
  }
  handleTodoAdd = (todo) => { // 투두아이템 추가
    const {writeForm} = this.state;
    const {todoTitle, todoContent} = writeForm;
    const todoId = todoContent.length > 0 ? (todoContent[todoContent.length - 1].todoId) + 1 : 0;
    
    if(todoTitle === ''){
      alert('항목을 입력하세요.');
      return;
    }
    this.setState(
      produce(draft => {
        const writeForm = draft.writeForm;
        writeForm.todoTitle = '';
        writeForm.todoContent.push({todoId, todo, isPerform : false});
      })
    );
  }
  handleTodoRemove = (todoId) => { // 투두아이템 삭제
    this.setState(
      produce(draft => {
        const writeForm = draft.writeForm;
        const targetTodoIndex = writeForm.todoContent.findIndex(todo => todo.todoId === todoId);
        writeForm.todoContent.splice(targetTodoIndex, 1);
      })
    );
  }
  handleTodoToggle = (todoId) => { // 투두아이템 토글 - 글 보기에서만 가능
    const {viewPostIndex} = this.state;

    this.setState(
      produce(draft => {
        const targetPost = draft.posts[viewPostIndex];
        const targetTodoIndex = targetPost.todoContent.findIndex(todo => todo.todoId === todoId);
        const targetTodo = targetPost.todoContent[targetTodoIndex];
        targetTodo.isPerform = !targetTodo.isPerform;
      })
    );    
  }
  render(){
    const {
      handlePostClose,
      handlePostStart,
      handlePostUpload,
      handlePostRemove,
      handlePostWrite,
      handlePostView,
      handlePostModify,
      handlePostModifyUpload,
      handleTodoAdd,
      handleTodoRemove,
      handleTodoToggle
    } = this;
    const {
      popupMode,
      writeForm,
      viewPostIndex,
      viewPostId,
      posts
    } = this.state;

    return (
      <div className="App">
        <header><h1>'s Todo</h1></header>
        <PostList 
          posts={posts}
          onPostStart={handlePostStart}
          onPostRemove={handlePostRemove}
          onPostView={handlePostView}
        />
        <div className={`popup_wrap ${popupMode ? 'on' : ''}`}>
          {
            (()=>{
              if(popupMode === 'write'){
                return (
                  <PostWrite
                    onPostClose={handlePostClose}
                    onPostUpload={handlePostUpload}
                    onPostWrite={handlePostWrite}
                    onTodoAdd={handleTodoAdd}
                    onTodoRemove={handleTodoRemove}
                    writeForm={writeForm}
                  />
                );
              }else if(popupMode === 'view'){
                return (
                  <PostView
                    onPostClose={handlePostClose}
                    onPostRemove={handlePostRemove}
                    onPostModify={handlePostModify}
                    onTodoRemove={handleTodoRemove}
                    onTodoToggle={handleTodoToggle}
                    viewPostId={viewPostId}
                    post={posts[viewPostIndex]}
                  />
                );
              }else if(popupMode === 'modify'){
                return (
                  <PostWrite
                    onPostClose={handlePostClose}
                    onPostUpload={handlePostModifyUpload}
                    onPostWrite={handlePostWrite}
                    onTodoAdd={handleTodoAdd}
                    onTodoRemove={handleTodoRemove}
                    popupMode={popupMode}
                    writeForm={writeForm}
                  />
                );
              }
            })()
          }
        </div>
      </div>
    );
  }
}

export default App;
