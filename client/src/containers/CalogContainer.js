import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Calendar from 'react-calendar/dist/entry.nostyle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import { getFormatNow } from '../utils/moment';
import { replaceZero } from '../utils/number';

import Calog from '../components/Calog';
import PostWrite from '../components/PostWrite';
import PostList from '../components/PostList';
import PostView from '../components/PostView';

import * as loginActions from '../store/modules/login';
import * as calogActions from '../store/modules/calog';

const Header = styled.header`
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #099268;
  h1 {
    padding: 1rem;
    text-align: center;
    font-weight: 300;
    font-size: 2rem;
    color: #fff;
  }
  .btn_group {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;

class CalogContainer extends Component {
  componentDidMount() {
    const { calogActions, currentDate } = this.props;
    calogActions.visitCalog(currentDate);
  }
  componentDidUpdate(prevProps, prevState) {
    const { calogActions, targetDate } = this.props;
    if (targetDate !== prevProps.targetDate) {
      const currentCalog = this.getCurrentCalog();
      calogActions.loading(currentCalog, targetDate.year, targetDate.month);
    }
  }
  componentWillUnmount() {
    const { calogActions } = this.props;
    calogActions.exitCalog();
  }
  getCurrentCalog = () => {
    const { match } = this.props;
    return match.params.id;
  };
  getPostExist = (year, month, date) => {
    const { posts } = this.props;

    return posts[year] && posts[year][month] && posts[year][month][date]
      ? true
      : false;
  };
  postReload = where => {
    const { calogActions, targetDate, history, match } = this.props;
    const currentCalog = this.getCurrentCalog();

    calogActions.initialize();
    calogActions.loading(currentCalog, targetDate.year, targetDate.month);
    if (where === 'back') {
      history.go(-1);
    } else if (where === 'home') {
      history.replace(`${match.url}`);
    }
  };
  handleActiveDateChange = date => {
    const { calogActions } = this.props;
    calogActions.changeActiveDate(date);
  };
  handleLogout = () => {
    const { loginActions, calogActions } = this.props;
    axios.post('/api/account/logout').then(res => {
      loginActions.logout();
      calogActions.logout();
      window.localStorage.clear();
    });
  };
  handleGoBack = e => {
    // 글쓰기 / 글보기 닫음
    e.preventDefault();
    this.postReload('back');
  };
  handlePostStart = () => {
    // 글쓰기 버튼 클릭
    const { history, match } = this.props;
    history.push(`${match.url}/write`);
  };
  handlePostUpload = e => {
    // 포스팅
    e.preventDefault();
    const { title, content, todoContent } = this.props.writeForm;
    const { userId } = this.props;
    const post = {
      writerId: userId,
      title: title,
      content: content,
      todoContent: todoContent,
      date: {
        year: getFormatNow('YYYY'),
        month: getFormatNow('MM'),
        date: getFormatNow('DD'),
        time: getFormatNow('HH:mm:ss')
      },
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
      this.postReload('home');
    });
  };
  handlePostRemove = _id => {
    // 포스트 삭제
    axios.delete(`/api/post/delete/${_id}`).then(res => {
      this.postReload('home');
    });
  };
  handleChange = e => {
    // 글쓰기 폼에서 입력
    const { calogActions } = this.props;
    calogActions.changeInput(e.target.name, e.target.value);
  };
  handlePostListView = date => {
    // 글 목록
    const { history, match, targetDate } = this.props;
    history.push(
      `${match.url}/posts/${targetDate.year}/${targetDate.month}/${replaceZero(
        date.getDate()
      )}`
    );
  };
  handlePostView = (_id, date) => {
    // 글 보기
    const { targetDate, history, match } = this.props;

    history.push(
      `${match.url}/post/${targetDate.year}/${targetDate.month}/${date}/${_id}`
    );
  };
  handlePostModify = postData => {
    // 글 수정 시작
    const { calogActions } = this.props;
    calogActions.postModify(postData);
  };
  handlePostModifyUpload = id => {
    // 글 수정 완료
    const { writeForm } = this.props;
    const { title, content, todoContent } = writeForm;

    if (title === '') {
      alert('제목을 입력해주세요.');
      return;
    }
    if (content === '' && todoContent.length === 0) {
      alert('내용 또는 TodoList 항목을 추가해주세요.');
      return;
    }
    const post = {
      title,
      content,
      todoContent,
      modifyDate: {
        year: getFormatNow('YYYY'),
        month: getFormatNow('MM'),
        date: getFormatNow('DD'),
        time: getFormatNow('HH:mm:ss')
      }
    };
    axios.put(`/api/post/modify/${id}`, post).then(res => {
      this.postReload('back');
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
  handleTodoToggle = (postId, todoId, date) => {
    // 투두아이템 토글 - 글 보기에서만 가능
    const { userId, targetDate } = this.props;
    const currentCalog = this.getCurrentCalog();
    const isOwner = userId === currentCalog;
    if (!isOwner) {
      alert('권한이 없습니다.');
      return;
    }
    const { calogActions } = this.props;
    calogActions.todoToggle(
      postId,
      todoId,
      targetDate.year,
      targetDate.month,
      date
    );
  };
  render() {
    const {
      getPostExist,
      handleActiveDateChange,
      handleLogout,
      handleGoBack,
      handlePostStart,
      handlePostUpload,
      handlePostRemove,
      handleChange,
      handlePostListView,
      handlePostView,
      handlePostModify,
      handlePostModifyUpload,
      handleTodoAdd,
      handleTodoRemove,
      handleTodoToggle
    } = this;
    const {
      userId,
      currentDate,
      writeForm,
      targetDate,
      posts,
      status,
      history,
      match
    } = this.props;
    const isOwner = userId === match.params.id;

    return (
      <div>
        <Header>
          <h1>{match.params.id}'s Calog</h1>
          <div className="btn_group">
            <button
              className="blue"
              onClick={() => {
                history.push('/caloggers');
              }}
            >
              Caloggers
            </button>
            {userId !== '' ? (
              <button className="red" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button
                className="blue"
                onClick={() => {
                  history.push('/login');
                }}
              >
                Login
              </button>
            )}
          </div>
        </Header>
        <Route
          path={`${match.url}`}
          exact
          render={props => (
            <Calog
              {...props}
              status={status}
              isOwner={isOwner}
              onLogout={handleLogout}
              onPostStart={handlePostStart}
              onPostListView={handlePostListView}
              onActiveDateChange={handleActiveDateChange}
              Calendar={Calendar}
              userId={userId}
              currentDate={currentDate}
              targetDate={targetDate}
              posts={posts}
            />
          )}
        />
        {isOwner !== '' && (
          <div>
            <Route
              path={`${match.url}/write`}
              render={props => (
                <PostWrite
                  {...props}
                  onGoBack={handleGoBack}
                  onPostUpload={handlePostUpload}
                  onChange={handleChange}
                  onTodoAdd={handleTodoAdd}
                  onTodoRemove={handleTodoRemove}
                  mode="write"
                  writeForm={writeForm}
                />
              )}
            />
            <Route
              path={`${match.url}/modify/:year/:month/:date/:id`}
              render={props => (
                <PostWrite
                  {...props}
                  calogActions={calogActions}
                  getPostExist={getPostExist}
                  onGoBack={handleGoBack}
                  onPostUpload={handlePostModifyUpload}
                  onPostModify={handlePostModify}
                  onChange={handleChange}
                  onTodoAdd={handleTodoAdd}
                  onTodoRemove={handleTodoRemove}
                  status={status}
                  mode="modify"
                  posts={posts}
                  userId={userId}
                  writeForm={writeForm}
                />
              )}
            />
          </div>
        )}
        <Route
          path={`${match.url}/post/:year/:month/:date/:id`}
          render={props => (
            <PostView
              {...props}
              getPostExist={getPostExist}
              onGoBack={handleGoBack}
              onPostRemove={handlePostRemove}
              onTodoToggle={handleTodoToggle}
              targetDate={targetDate}
              posts={posts}
              userId={userId}
              isOwner={isOwner}
            />
          )}
        />
        <Route
          path={`${match.url}/posts/:year/:month/:date`}
          render={props => (
            <PostList
              {...props}
              getPostExist={getPostExist}
              onGoBack={handleGoBack}
              onPostRemove={handlePostRemove}
              onPostView={handlePostView}
              targetDate={targetDate}
              status={status}
              userId={userId}
              posts={posts}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ login, calog }) => ({
  userId: login.userId,
  userNickname: login.userNickname,
  status: calog.status,
  currentDate: calog.currentDate,
  writeForm: calog.writeForm,
  targetDate: calog.targetDate,
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
