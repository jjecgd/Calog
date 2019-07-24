import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';

import GlobalStyles from './components/GlobalStyles';
import IntroContainer from './containers/IntroContainer';
import JoinFormContainer from './containers/JoinFormContainer';
import LoginFormContainer from './containers/LoginFormContainer';
import CalogContainer from './containers/CalogContainer';
import CalogerListContainer from './containers/CaloggersContainer';

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
    const { loginActions } = this.props;
    loginActions.loading();
  }
  render() {
    return (
      <div>
        <GlobalStyles />
        <Route path="/" component={IntroContainer} exact />
        <Route path="/login" component={LoginFormContainer} />
        <Route path="/join" component={JoinFormContainer} />
        <Route path="/calogs/:id" component={CalogContainer} />
        <Route path="/caloggers" component={CalogerListContainer} />
      </div>
    );
  }
}

const mapStateToProps = ({ login, calog }) => ({
  status: login.status,
  userId: login.userId,
  showCalogId: calog.showCalogId
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
