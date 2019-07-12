import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Route } from 'react-router-dom';

import GlobalStyles from './components/GlobalStyles';
import LoginFormContainer from './containers/LoginFormContainer';
import JoinFormContainer from './containers/JoinFormContainer';
import CalogContainer from './containers/CalogContainer';

import * as loginActions from './store/modules/login';

/* state.posts의 구조
posts -- postId
       - title
       - content
       - todoContent -- todoId
       - date         - todo
       - modifyDate   - isPerform

*/

class App extends Component {
  componentDidMount() {
    this.getSession();
  }
  getSession() {
    const { loginActions } = this.props;

    axios.get('/api/account/getSession/').then(res => {
      if (res.data.info) {
        loginActions.login(res.data.info.id, res.data.info.nickname);
      }
    });
  }
  render() {
    const { userId, isLogin } = this.props; // for Redux

    return (
      <div>
        <GlobalStyles />
        {!isLogin && userId === '' ? (
          <Redirect to="/login" />
        ) : (
          <Redirect to={`/calog/${userId}`} />
        )}
        <Route path="/calog/:id" component={CalogContainer} exact={true} />
        <Route path="/login" component={LoginFormContainer} />
        <Route path="/join" component={JoinFormContainer} />
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  isLogin: login.isLogin,
  userId: login.userId
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
