import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Intro extends Component {
  render() {
    const { userId } = this.props;
    return (
      <div className="introContainer">
        <Link
          className="button green"
          to={userId === null ? '/login' : `/calogs/${userId}`}
        >
          <span>My Calog</span>
        </Link>
        <Link className="button blue" to="/caloggers">
          <span>Caloggers</span>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  userId: login.userId
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intro);
