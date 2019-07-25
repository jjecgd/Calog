import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../store/modules/login';
import LoginForm from '../components/LoginForm';

class LoginFormContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { history } = this.props;

    if (nextProps.userId !== '') {
      history.go(-1);
      alert('이미 로그인 하셨습니다.');
    }
    return true;
  }

  handleChange = e => {
    const { loginActions } = this.props;
    loginActions.changeInput(e.target.name, e.target.value);
  };
  handleLogin = e => {
    const { history, id, password, loginActions } = this.props;
    const userLoginForm = {
      id,
      password
    };

    e.preventDefault();
    loginActions.login(false, userLoginForm).then(res => {
      history.replace(`/calogs/${res.data.id}`);
      loginActions.login(true);
    });
  };
  render() {
    const { handleChange, handleLogin } = this;
    const { id, password, userId } = this.props;

    return (
      <div>
        {userId === '' && (
          <LoginForm
            id={id}
            password={password}
            onChange={handleChange}
            onLogin={handleLogin}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  id: login.id,
  password: login.password,
  userId: login.userId
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer);
