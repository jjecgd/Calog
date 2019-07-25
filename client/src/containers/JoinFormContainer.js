import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { getDateNow } from '../utils/moment';

import * as joinActions from '../store/modules/join';
import JoinForm from '../components/JoinForm';

class JoinFormContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { history } = this.props;

    if (nextProps.userId !== '') {
      history.go(-1);
      alert('이미 로그인 하셨습니다.');
    }
    return true;
  }
  handleChange = e => {
    const { joinActions } = this.props;

    joinActions.changeInput(e.target.name, e.target.value);
  };
  handleBlur = e => {
    const { joinActions } = this.props;
    const { id, email, password, passwordConfirm, nickname } = this.props;
    const userForm = {
      id: id.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
      nickname: nickname.value,
      created: undefined,
      target: e.target.name
    };

    axios
      .post('/api/account/check', userForm)
      .then(res => {
        joinActions.blurInput(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleSubmit = e => {
    const { joinActions, id, email, password, nickname, history } = this.props;
    const userForm = {
      id: id.value,
      email: email.value,
      password: password.value,
      nickname: nickname.value,
      created: getDateNow()
    };

    e.preventDefault();
    axios
      .post('/api/account/join/', userForm)
      .then(res => {
        alert('가입이 완료되었습니다.');
        history.replace('/login');
        joinActions.initialize();
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleCancel = e => {
    const { joinActions, history } = this.props;

    e.preventDefault();
    joinActions.initialize();
    history.push('/login');
  };
  render() {
    const { handleChange, handleBlur, handleSubmit, handleCancel } = this;
    const {
      userId,
      id,
      password,
      passwordConfirm,
      username,
      nickname,
      email
    } = this.props;

    return (
      <div>
        {userId === '' && (
          <JoinForm
            id={id}
            password={password}
            passwordConfirm={passwordConfirm}
            username={username}
            nickname={nickname}
            email={email}
            onChange={handleChange}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ login, join }) => ({
  userId: login.userId,
  id: join.id,
  email: join.email,
  password: join.password,
  passwordConfirm: join.passwordConfirm,
  nickname: join.nickname
});

const mapDispatchToProps = dispatch => ({
  joinActions: bindActionCreators(joinActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinFormContainer);
