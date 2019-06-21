import React, {Component} from 'react';
import moment from 'moment';
import PostList from './components/PostList';
import PostWrite from './components/PostWrite';
import PostView from './components/PostView';
import './App.scss';

class App extends Component{
  state = {
    isPopup : false,
    isWrite : false,
    isView : false,
    isModify : false,
    writeForm : { // 글쓰기 폼에 입력된 데이터
      title : '',
      content : '',
      todoTitle : '',
      todoContent : []
    },
    viewPostIndex : -1,
    viewPostId : -1,
    modifyPostId : -1,
    posts : []
  }
  postId = this.state.posts.length

  initState = () => { // 글쓰기 취소, 포스팅 시에 State 초기화
    this.setState({
      isPopup : false,
      isWrite : false,
      isView : false,
      writeForm : {
        title : '',
        content : '',
        todoTitle : '',
        todoContent : []
      },
      viewPostIndex : -1,
      viewPostId : -1,
      modifyPostId : -1
    });
  }
  handlePostClose = (e) => { // 글쓰기 / 글보기 닫음
    e.preventDefault();
    this.initState();
  }
  handlePostStart = () => { // 글쓰기 버튼 클릭
    this.setState({
      isPopup : true,
      isWrite : true
    });
  }
  handlePostUpload = (e) => { // 포스팅
    e.preventDefault();
    const {title, content, todoContent} = this.state.writeForm;

    if(title === ''){
      alert('제목을 입력해주세요.');
      return;
    }

    if(content === '' && todoContent.length === 0){
      alert('내용 또는 TodoList 항목을 추가해주세요.');
      return;
    }

    this.initState();
    this.setState({
      posts : this.state.posts.concat({
        postId : this.postId++,
        title : title,
        content : content,
        todoContent : [...todoContent],
        performRatio : 0
      })
    });
  }
  handlePostRemove = (postId) => { // 포스트 삭제
    const {posts} = this.state;
    this.initState();
    this.setState({
      posts : posts.filter((post) => post.postId !== postId)
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
  handlePostView = (postId) => { // 글 보기
    const {posts} = this.state;
    this.setState({
      isPopup : true,
      isView : true,
      viewPostIndex : posts.findIndex((post) => post.postId === postId),
      viewPostId : postId
    });
  }
  handlePostModify = (obj, postId) => { // 글 수정 시작
    this.initState();
    this.setState({
      isPopup : true,
      isModify : true,
      writeForm : {
        ...this.state.writeForm,
        ...obj
      },
      modifyPostId : postId
    });
  }
  handlePostModifyUpload = (e) => { // 글 수정 완료
    e.preventDefault();
    const {title, content, todoContent} = this.state.writeForm;
    let cnt = 0;

    this.setState({
      posts : this.state.posts.map(
        post => {
          if(post.postId === this.state.modifyPostId){
            return {
              ...post,
              title : title,
              content : content,
              todoContent : todoContent.map(
                (todo) => {
                  if(todo.isPerform){
                    cnt++;
                  }
                  return {...todo};
                }
              ),
              performRatio : ((cnt / todoContent.length) * 100).toFixed(0)
            };
          }else{
            return {...post};
          }
        }
      )
    });
    this.initState();
  }
  handleTodoAdd = (todo) => { // 투두아이템 추가
    const {writeForm} = this.state;
    const {todoTitle, todoContent} = writeForm;
    const todoId = todoContent.length > 0 ? (todoContent[todoContent.length - 1].todoId) + 1 : 0;
    
    if(todoTitle === ''){
      alert('항목을 입력하세요.');
      return;
    }

    this.setState({
      writeForm : {
        ...writeForm,
        todoTitle : '',
        todoContent : todoContent.concat({todoId, todo, isPerform : false})
      }
    });
  }
  handleTodoRemove = (todoId) => { // 투두아이템 삭제
    const {writeForm} = this.state;
    const {todoContent} = writeForm;
    this.setState({
      writeForm : {
        ...writeForm,
        todoContent : todoContent.filter(
          (item) => item.todoId !== todoId
        )
      }
    });
  }
  handleTodoToggle = (todoId) => { // 투두아이템 토글 - 글 보기에서만 가능
    const {posts, viewPostIndex} = this.state;
    const targetPost = posts[viewPostIndex];
    let cnt = 0;

    this.setState({
      posts : posts.map(
        (post) => {
          if(post.postId === targetPost.postId){
            return {
              ...post, 
              todoContent : post.todoContent.map(
                (todo) => {
                  if(todo.isPerform){
                    cnt++;
                  }
                  if(todo.todoId === todoId){
                    if(!todo.isPerform){
                      cnt++;
                    }else{
                      cnt--;
                    }
                    return {...todo, isPerform : !todo.isPerform};
                  }else{
                    return {...todo};
                  }
                }
              ),
              performRatio : ((cnt / post.todoContent.length) * 100).toFixed(0)
            }
          }else{
            return {...post};
          }
        }
      )
    });
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
      isPopup,
      isWrite,
      isView,
      isModify,
      writeForm,
      viewPostIndex,
      viewPostId,
      posts
    } = this.state;

    return (
      <div className="App">
        <header><h1>Todo</h1></header>
        <PostList 
          posts={posts} 
          onPostStart={handlePostStart} 
          onPostRemove={handlePostRemove} 
          onPostView={handlePostView}
        />
        <div className={`popup_wrap ${isPopup ? 'on' : ''}`}>
          {
            (()=>{
              if(isWrite){
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
              }else if(isView){
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
              }else if(isModify){
                return (
                  <PostWrite
                    onPostClose={handlePostClose}
                    onPostUpload={handlePostModifyUpload}
                    onPostWrite={handlePostWrite}
                    onTodoAdd={handleTodoAdd}
                    onTodoRemove={handleTodoRemove}
                    isModify={isModify}
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
