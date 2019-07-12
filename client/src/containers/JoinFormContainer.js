import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { getDateNow } from '../utils/utils';

import * as joinActions from '../store/modules/join';
import JoinForm from '../components/JoinForm';

class JoinFormContainer extends Component {
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
    const { id, email, password, nickname } = this.props;
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
        //console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { handleChange, handleBlur, handleSubmit } = this;
    const {
      id,
      password,
      passwordConfirm,
      username,
      nickname,
      email
    } = this.props;
    return (
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
      />
    );
  }
}

const mapStateToProps = ({ join }) => ({
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
