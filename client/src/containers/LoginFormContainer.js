import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as loginActions from '../store/modules/login';
import LoginForm from '../components/LoginForm';

class LoginFormContainer extends Component {
  handleChange = e => {
    const { loginActions } = this.props;

    loginActions.changeInput(e.target.name, e.target.value);
  };
  handleLogin = e => {
    const { id, password, loginActions } = this.props;
    const userLoginForm = {
      id,
      password
    };

    e.preventDefault();
    axios
      .post('/api/account/login/', userLoginForm)
      .then(res => {
        loginActions.login(res.data.info.id, res.data.info.nickname);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { handleChange, handleLogin } = this;
    const { id, password } = this.props;
    return (
      <LoginForm
        id={id}
        password={password}
        onChange={handleChange}
        onLogin={handleLogin}
      />
    );
  }
}

const mapStateToProps = ({ login }) => ({
  id: login.id,
  password: login.password
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer);
