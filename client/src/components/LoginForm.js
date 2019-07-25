import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  box-sizing: border-box;
  position: absolute;
  padding: 1rem;
  width: 100%;
  height: 100%;
`;
const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
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
      <Wrap>
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
      </Wrap>
    );
  }
}

export default LoginForm;
