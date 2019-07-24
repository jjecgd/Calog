import React, { Component } from 'react';
import axios from 'axios';
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

class CalogContainer extends Component {
  componentDidMount() {
    const { calogActions, match, currentDate } = this.props;
    calogActions.visitCalog(match.params.id, currentDate);
  }
  componentDidUpdate(prevProps, prevState) {
    const { calogActions, targetDate, showCalogId } = this.props;

    if (
      (targetDate !== prevProps.targetDate ||
        showCalogId !== prevProps.showCalogId) &&
      showCalogId !== ''
    ) {
      calogActions.loading(showCalogId, targetDate.year, targetDate.month);
    }
  }
  initState = () => {
    const {
      calogActions,
      history,
      match,
      targetDate,
      showCalogId
    } = this.props;
    // 글쓰기 취소, 포스팅 시에 State 초기화

    calogActions.initialize();
    calogActions.loading(showCalogId, targetDate.year, targetDate.month);
    history.push(`${match.url}`);
  };
  handleActiveDateChange = date => {
    const { calogActions } = this.props;
    calogActions.changeActiveDate(date);
  };
  handleLogout = () => {
    const { loginActions, calogActions, history } = this.props;
    axios.post('/api/account/logout').then(res => {
      history.push('/login');
      loginActions.logout();
      calogActions.logout();
      window.localStorage.clear();
    });
  };
  handlePostClose = e => {
    // 글쓰기 / 글보기 닫음
    e.preventDefault();
    this.initState();
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
  handlePostModify = (beforeForm, date, id) => {
    // 글 수정 시작
    const { calogActions, history, match, targetDate } = this.props;

    this.initState();
    calogActions.postModify(beforeForm);
    history.push(
      `${match.url}/modify/${targetDate.year}/${targetDate.month}/${date}/${id}`
    );
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
      title: title,
      content: content,
      todoContent: todoContent,
      modifyDate: {
        year: getFormatNow('YYYY'),
        month: getFormatNow('MM'),
        date: getFormatNow('DD'),
        time: getFormatNow('HH:mm:ss')
      }
    };
    axios.put(`/api/post/modify/${id}`, post).then(res => {
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
  handleTodoToggle = (postId, todoId, date) => {
    // 투두아이템 토글 - 글 보기에서만 가능
    const { userId, targetDate, showCalogId } = this.props;
    const isOwner = userId === showCalogId;
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
      handleActiveDateChange,
      handleLogout,
      handlePostClose,
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
      match,
      userId,
      showCalogId,
      currentDate,
      writeForm,
      targetDate,
      posts,
      status
    } = this.props;
    const isOwner = userId === showCalogId;

    return (
      <div>
        <Route
          path={`${match.url}`}
          render={props => (
            <Calog
              {...props}
              onLogout={handleLogout}
              onPostStart={handlePostStart}
              onPostListView={handlePostListView}
              onActiveDateChange={handleActiveDateChange}
              Calendar={Calendar}
              status={status}
              isOwner={isOwner}
              userId={userId}
              showCalogId={showCalogId}
              currentDate={currentDate}
              targetDate={targetDate}
              posts={posts}
            />
          )}
        />
        {status === 'SUCCESS' && (
          <div>
            <Route
              path={`${match.url}/write`}
              render={props => (
                <PostWrite
                  {...props}
                  onPostClose={handlePostClose}
                  onPostUpload={handlePostUpload}
                  onChange={handleChange}
                  onTodoAdd={handleTodoAdd}
                  onTodoRemove={handleTodoRemove}
                  writeForm={writeForm}
                />
              )}
            />
            <Route
              path={`${match.url}/modify/:year/:month/:date/:id`}
              render={props => (
                <PostWrite
                  {...props}
                  onPostClose={handlePostClose}
                  onPostUpload={handlePostModifyUpload}
                  onChange={handleChange}
                  onTodoAdd={handleTodoAdd}
                  onTodoRemove={handleTodoRemove}
                  writeForm={writeForm}
                />
              )}
            />
            <Route
              path={`${match.url}/post/:year/:month/:date/:id`}
              render={props => (
                <PostView
                  {...props}
                  onPostClose={handlePostClose}
                  onPostRemove={handlePostRemove}
                  onPostModify={handlePostModify}
                  onTodoRemove={handleTodoRemove}
                  onTodoToggle={handleTodoToggle}
                  targetDate={targetDate}
                  posts={posts}
                  isOwner={isOwner}
                />
              )}
            />
            <Route
              path={`${match.url}/posts/:year/:month/:date`}
              render={props => (
                <PostList
                  {...props}
                  onPostRemove={handlePostRemove}
                  onPostView={handlePostView}
                  targetDate={targetDate}
                  posts={posts}
                />
              )}
            />
          </div>
        )}
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
  showCalogId: calog.showCalogId,
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
