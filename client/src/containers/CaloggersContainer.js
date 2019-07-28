import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HeaderBar from '../components/HeaderBar';

import * as loginActions from '../store/modules/login';
import * as caloggersActions from '../store/modules/caloggers';

const Wrap = styled.div`
  padding: 6rem 2rem 2rem;
`;
const Calogger = styled(Link)`
  display: inline-block;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  color: #087f5b;
  font-weight: bold;
  border: 2px solid #087f5b;
  background: #fff;
  transition-property: border, color, background;
  transition-duration: 0.3s;

  &:hover {
    color: #fff;
    border: 2px solid #5f3dc4;
    background: #5f3dc4;
  }
`;

class CalogGobalContainer extends Component {
  componentDidMount() {
    const { caloggersActions } = this.props;
    caloggersActions.getCaloggers();
  }
  render() {
    const { loginActions, calogActions, calogUsers, history } = this.props;
    const caloggers = calogUsers.map(calogger => (
      <Calogger to={`calogs/${calogger.id}`} key={calogger._id}>
        {calogger.nickname}
      </Calogger>
    ));

    return (
      <Wrap>
        <HeaderBar
          loginActions={loginActions}
          calogActions={calogActions}
          history={history}
          mode="caloggers"
        />
        {caloggers}
      </Wrap>
    );
  }
}

const mapStateToProps = ({ login, caloggers }) => ({
  userId: login.userId,
  status: caloggers.status,
  calogUsers: caloggers.calogUsers
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActions, dispatch),
  caloggersActions: bindActionCreators(caloggersActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalogGobalContainer);
