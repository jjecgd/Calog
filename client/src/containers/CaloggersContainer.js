import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as caloggersActions from '../store/modules/caloggers';

const Wrap = styled.div`
  padding: 2rem;
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

    return <Wrap>{caloggers}</Wrap>;
  }
}

const mapStateToProps = ({ caloggers }) => ({
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
