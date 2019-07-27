import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as caloggersActions from '../store/modules/caloggers';

const Wrap = styled.div`
  padding: 6rem 2rem 2rem;
`;
const Caloger = styled(Link)`
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
`;

class CalogGobalContainer extends Component {
  componentDidMount() {
    const { caloggersActions } = this.props;
    caloggersActions.getCaloggers();
  }
  render() {
    const { calogUsers } = this.props;
    const caloggers = calogUsers.map(caloger => (
      <Caloger to={`calogs/${caloger.id}`} key={caloger._id}>
        {caloger.nickname}
      </Caloger>
    ));

    return (
      <Wrap>
        <Header>
          <h1>Caloggers</h1>
        </Header>
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
  caloggersActions: bindActionCreators(caloggersActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalogGobalContainer);
