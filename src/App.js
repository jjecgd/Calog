import React, {Component} from 'react';
import PostList from './components/PostList';
import PostWriteForm from './components/PostWriteForm';
import './App.css';

class App extends Component{
  state = {
    isPopup : false,
    isWrite : false,
    writeMode : { // 글쓰기 모드
      normal : true,
      todo : false
    },
    writeForm : { // 글쓰기 폼에 입력된 데이터
      title : '',
      content : ''
    },
    posts : []
  }
  postId = this.state.posts.length

  initState = () => { // 글쓰기 취소, 포스팅 시에 State 초기화
    this.setState({
      isPopup : false,
      isWrite : false,
      writeMode : {
        normal : true,
        todo : false
      },
      writeForm : {
        title : '',
        content : ''
      }
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
    })
  }
  handleCancel = () => { // 글쓰기 취소
    this.initState();
  }
  handlePost = (e) => { // 포스팅
    const {normal, todo} = this.state.writeMode;
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
        title : this.state.writeForm.title,
        content : this.state.writeForm.content
      })
    });
  }
  handleWriteModeChange = (e) => { // 글쓰기 유형 변경
    const {writeMode, writeForm} = this.state;

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
      writeMode : (()=>{
        const temp = {};
        for(let a in writeMode){
          temp[a] = false;
        }
        temp[e.target.name] = true;
        return temp;
      })()
    });
  }
  handleRemove = (postId) => { // 포스트 삭제
    const {posts} = this.state;
    this.setState({
      posts : posts.filter((post) => post.postId !== postId)
    });
  }  
  render(){
    const {
      handleWrite,
      handleWriteModeChange,
      handleRemove,
      handleChange,
      handleAddTodo,
      handleRemoveTodo,
      handleCancel,
      handlePost
    } = this;
    const {
      isPopup,
      isWrite,
      posts,
      writeForm,
      writeMode
    } = this.state;

    return (
      <div className="App">
        <header><h1>Todo</h1></header>
        <PostList posts={posts} onWrite={handleWrite} onRemove={handleRemove}/>
        <div className={`popup_wrap ${isPopup ? 'on' : ''}`}>
          {
            isWrite ? 
            (
              <PostWriteForm 
                onWriteModeChange={handleWriteModeChange}
                onPost={handlePost} 
                onCancel={handleCancel} 
                onChangeForm={handleChange} 
                onAddTodo={handleAddTodo}
                onRemoveTodo={handleRemoveTodo}
                writeForm={writeForm} 
                writeMode={writeMode}
              />
            ) : 
            null
          }
        </div>
      </div>
    );
  }
}

export default App;
