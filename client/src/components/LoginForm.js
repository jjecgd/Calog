import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Form = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -200px;
  width: 400px;
  height: 200px;

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  button {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

class LoginForm extends Component {
  render() {
    const { id, password, onChange, onLogin } = this.props;

    return (
      <div>
        <Form onSubmit={onLogin}>
          <input
            name="id"
            placeholder="아이디"
            value={id}
            onChange={onChange}
          />
          <input
            name="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onChange}
          />
          <button className="green">로그인</button>
          <button className="blue">
            <Link to="/join">회원가입</Link>
          </button>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
