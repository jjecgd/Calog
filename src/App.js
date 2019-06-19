import React, {Component} from 'react';
import PostList from './components/PostList';
import PostWriteForm from './components/PostWriteForm';
import PostView from './components/PostView';
import './App.css';

class App extends Component{
  state = {
    isPopup : false,
    isWrite : false,
    isView : false,
    postType : { // 글쓰기 모드
      normal : true,
      todo : false
    },
    writeForm : { // 글쓰기 폼에 입력된 데이터
      title : '',
      content : ''
    },
    viewPostIndex : -1,
    posts : []
  }
  postId = this.state.posts.length

  initState = () => { // 글쓰기 취소, 포스팅 시에 State 초기화
    this.setState({
      isPopup : false,
      isWrite : false,
      isView : false,
      postType : {
        normal : true,
        todo : false
      },
      writeForm : {
        title : '',
        content : ''
      },
      viewPostIndex : -1
    });
  }
  handleWrite = () => { // 글쓰기 버튼 클릭
    this.setState({
      isPopup : true,
      isWrite : true
    });
  }
  handleChange = (e) => { // 글쓰기 폼에서 입력
    this.setState({
      writeForm : {
        ...this.state.writeForm,
        [e.target.name] : e.target.value
      }
    });
  }
  handleAddTodo = (todo, todoId) => { // 투두아이템 추가
    const {title, content} = this.state.writeForm;

    if(title === ''){
      alert('항목을 입력하세요.');
      return;
    }

    this.setState({
      writeForm : {
        title : '',
        content : content.concat({todoId, todo, isPerform : false})
      }
    });
  }
  handleRemoveTodo = (todoId) => { // 투두아이템 삭제
    const {content} = this.state.writeForm;
    this.setState({
      writeForm : {
        ...this.state.writeForm,
        content : content.filter(
          item => item.todoId !== todoId
        )
      }
    });
  }
  handleToggleTodo = (todoId) => { // 투두아이템 토글 - 글 보기에서만 가능
    const {posts, viewPostIndex} = this.state;
    const targetPost = posts[viewPostIndex];
    let cnt = 0;

    this.setState({
      posts : posts.map(
        post => {
          if(post.postId === targetPost.postId){
            return {
              ...post, 
              content : post.content.map(
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
              performRatio : ((cnt / post.content.length) * 100).toFixed(1)
            }
          }else{
            return {...post};
          }
        }
      )
    });
  }
  handleCancel = () => { // 글쓰기 취소
    this.initState();
  }
  handlePostUpload = (e) => { // 포스팅
    const {normal, todo} = this.state.postType;
    const {title, content} = this.state.writeForm;

    e.preventDefault();

    if(normal){
      if(title === ''){
        alert('제목을 입력하세요.');
        return;
      }else if(content === ''){
        alert('내용을 입력하세요.');
        return;
      }
    }

    if(todo && content.length === 0){
      alert('투두리스트 항목을 추가하세요.');
      return;
    }

    this.initState();
    this.setState({
      posts : this.state.posts.concat({
        postType : normal ? 'normal' : todo ? 'todo' : '',
        postId : this.postId++,
        title,
        content,
        performRatio : 0
      })
    });
  }
  handlePostTypeChange = (e) => { // 글쓰기 유형 변경
    const {postType} = this.state;

    e.preventDefault();

    if(e.target.name === 'todo'){
      this.setState({
        writeForm : {
          title : '',
          content : []
        }
      });
    }else{
      this.setState({
        writeForm : {
          title : '',
          content : ''
        }
      });
    }
    
    this.setState({
      postType : (()=>{
        const temp = {};
        for(let a in postType){
          temp[a] = false;
        }
        temp[e.target.name] = true;
        return temp;
      })()
    });
  }
  handlePostRemove = (postId) => { // 포스트 삭제
    const {posts} = this.state;
    this.setState({
      posts : posts.filter((post) => post.postId !== postId)
    });
  }
  handlePostView = (postId) => {
    const {posts} = this.state;
    this.setState({
      isPopup : true,
      isView : true,
      viewPostIndex : posts.findIndex((post) => post.postId === postId),
    });
  }
  render(){
    const {
      handleWrite,
      handlePostTypeChange,
      handlePostRemove,
      handlePostUpload,
      handlePostView,
      handleChange,
      handleAddTodo,
      handleRemoveTodo,
      handleToggleTodo,
      handleCancel,
    } = this;
    const {
      isPopup,
      isWrite,
      isView,
      posts,
      writeForm,
      postType,
      viewPostIndex
    } = this.state;

    return (
      <div className="App">
        <header><h1>Todo</h1></header>
        <PostList posts={posts} onWrite={handleWrite} onPostRemove={handlePostRemove} onPostView={handlePostView}/>
        <div className={`popup_wrap ${isPopup ? 'on' : ''}`}>
          {
            (()=>{
              if(isWrite){
                return (
                  <PostWriteForm 
                    onCancel={handleCancel}
                    onChangeForm={handleChange}
                    onPostTypeChange={handlePostTypeChange}
                    onPostUpload={handlePostUpload}
                    onAddTodo={handleAddTodo}
                    onRemoveTodo={handleRemoveTodo}
                    writeForm={writeForm} 
                    postType={postType}
                  />
                );
              }else if(isView){
                return (
                  <PostView
                    post={posts[viewPostIndex]}
                    onRemoveTodo={handleRemoveTodo}
                    onToggleTodo={handleToggleTodo}
                    onCancel={handleCancel}
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
