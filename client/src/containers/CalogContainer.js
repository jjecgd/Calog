import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDateNow } from '../utils/utils';

import PostList from '../components/PostList';
import PostWrite from '../components/PostWrite';
import PostView from '../components/PostView';

import * as loginActions from '../store/modules/login';
import * as calogActions from '../store/modules/calog';

const Header = styled.header`
  position: relative;
  width: 100%;
  background: #37b24d;
  h1 {
    padding: 1rem;
    text-align: center;
    font-weight: 300;
    font-size: 2rem;
    color: #fff;
  }
  button {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;

const Popup = styled.div`
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  &.on {
    display: block;
  }
`;

class CalogContainer extends Component {
  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    const { calogActions } = this.props;

    axios
      .get(`/api/post/${this.props.match.params.id}`)
      .then(res => {
        calogActions.setPosts(res.data);
      })
      .catch(err => console.log(err));
  }
  initState = () => {
    const { calogActions } = this.props;
    // 글쓰기 취소, 포스팅 시에 State 초기화

    calogActions.initialize();
    this.getPosts();
  };
  handleLogout = () => {
    const { loginActions, calogActions, history } = this.props;
    axios.post('/api/account/logout').then(res => {
      loginActions.logout();
      calogActions.logout();
      window.localStorage.clear();
      history.push('/login');
    });
  };
  handlePostClose = e => {
    // 글쓰기 / 글보기 닫음
    e.preventDefault();
    this.initState();
  };
  handlePostStart = () => {
    // 글쓰기 버튼 클릭
    const { calogActions } = this.props;
    calogActions.postStart();
  };
  handlePostUpload = e => {
    // 포스팅
    e.preventDefault();
    const { title, content, todoContent } = this.props.writeForm;
    const { userId } = this.props;
    const date = getDateNow();

    const post = {
      writerId: userId,
      title: title,
      content: content,
      todoContent: todoContent,
      date: date,
      modifyDate: undefined
    };

    if (title === '') {
      alert('제목을 입력해주세요.');
      return;
    }
    if (content === '' && todoContent.length === 0) {
      alert('내용 또는 TodoList 항목을 추가해주세요.');
      return;
    }
    axios.post('/api/post/upload/', post).then(res => {
      this.initState();
    });
  };
  handlePostRemove = _id => {
    // 포스트 삭제
    axios.delete(`/api/post/delete/${_id}`).then(res => {
      this.initState();
    });
  };
  handleChange = e => {
    // 글쓰기 폼에서 입력
    const { calogActions } = this.props;

    calogActions.changeInput(e.target.name, e.target.value);
  };
  handlePostView = _id => {
    // 글 보기
    const { calogActions, posts } = this.props;

    calogActions.postView(posts.findIndex(post => post._id === _id), _id);
  };
  handlePostModify = (beforeForm, _id) => {
    // 글 수정 시작
    const { calogActions, posts } = this.props;

    this.initState();
    calogActions.postModify(
      beforeForm,
      posts.findIndex(post => post._id === _id),
      _id
    );
  };
  handlePostModifyUpload = e => {
    // 글 수정 완료
    e.preventDefault();
    const { modifyPostId } = this.props;
    const { title, content, todoContent } = this.props.writeForm;

    if (title === '') {
      alert('제목을 입력해주세요.');
      return;
    }
    if (content === '' && todoContent.length === 0) {
      alert('내용 또는 TodoList 항목을 추가해주세요.');
      return;
    }
    const post = {
      title: title,
      content: content,
      todoContent: todoContent,
      modifyDate: this.getDateNow()
    };
    axios.put(`/api/post/modify/${modifyPostId}`, post).then(res => {
      this.initState();
    });
  };
  handleTodoAdd = todo => {
    // 투두아이템 추가
    const { calogActions, writeForm } = this.props;
    const { todoTitle, todoContent } = writeForm;
    const todoId =
      todoContent.length > 0
        ? todoContent[todoContent.length - 1].todoId + 1
        : 0;

    if (todoTitle === '') {
      alert('항목을 입력하세요.');
      return;
    }
    calogActions.todoAdd(todoId, todo);
  };
  handleTodoRemove = todoId => {
    // 투두아이템 삭제
    const { calogActions } = this.props;
    calogActions.todoRemove(todoId);
  };
  handleTodoToggle = todoId => {
    // 투두아이템 토글 - 글 보기에서만 가능
    const { calogActions, viewPostIndex } = this.props;
    calogActions.todoToggle(viewPostIndex, todoId);
  };
  render() {
    const {
      handleLogout,
      handlePostClose,
      handlePostStart,
      handlePostUpload,
      handlePostRemove,
      handleChange,
      handlePostView,
      handlePostModify,
      handlePostModifyUpload,
      handleTodoAdd,
      handleTodoRemove,
      handleTodoToggle
    } = this;
    const { userNickname } = this.props;
    const {
      popupMode,
      writeForm,
      viewPostIndex,
      viewPostId,
      posts
    } = this.props;

    return (
      <div>
        <Header>
          <h1>{userNickname}'s calog</h1>
          <button className="blue" onClick={null}>
            둘러보기
          </button>
          <button className="red" onClick={handleLogout}>
            로그아웃
          </button>
        </Header>
        <PostList
          posts={posts}
          onPostStart={handlePostStart}
          onPostRemove={handlePostRemove}
          onPostView={handlePostView}
        />
        <Popup className={popupMode ? 'on' : ''}>
          {(() => {
            if (popupMode === 'write') {
              return (
                <PostWrite
                  onPostClose={handlePostClose}
                  onPostUpload={handlePostUpload}
                  onChange={handleChange}
                  onTodoAdd={handleTodoAdd}
                  onTodoRemove={handleTodoRemove}
                  writeForm={writeForm}
                />
              );
            } else if (popupMode === 'view') {
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
            } else if (popupMode === 'modify') {
              return (
                <PostWrite
                  onPostClose={handlePostClose}
                  onPostUpload={handlePostModifyUpload}
                  onChange={handleChange}
                  onTodoAdd={handleTodoAdd}
                  onTodoRemove={handleTodoRemove}
                  popupMode={popupMode}
                  writeForm={writeForm}
                />
              );
            }
          })()}
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = ({ login, calog }) => ({
  userId: login.userId,
  userNickname: login.userNickname,
  popupMode: calog.popupMode,
  writeForm: calog.writeForm,
  viewPostIndex: calog.viewPostIndex,
  viewPostId: calog.viewPostId,
  modifyPostIndex: calog.modifyPostIndex,
  modifyPostId: calog.modifyPostId,
  posts: calog.posts
});
const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActions, dispatch),
  calogActions: bindActionCreators(calogActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalogContainer);
