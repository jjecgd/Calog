import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  .btn_group {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;

const HeaderBar = ({
  calogActions,
  loginActions,
  currentCalog,
  userId,
  history,
  mode
}) => {
  return (
    <Header>
      <h1>{mode === 'caloggers' ? 'Caloggers' : `${currentCalog}s Calog`}</h1>
      <div className="btn_group">
        <button
          className="blue"
          onClick={() => {
            history.push('/caloggers');
          }}
        >
          Caloggers
        </button>
        {userId !== '' ? (
          <button
            className="red"
            onClick={() => {
              axios.post('/api/account/logout').then(res => {
                loginActions.logout();
                calogActions.logout();
                window.localStorage.clear();
              });
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="blue"
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </button>
        )}
      </div>
    </Header>
  );
};

export default HeaderBar;
