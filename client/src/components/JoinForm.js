import React, { Component } from 'react';
import styled from 'styled-components';

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

const Msg = styled.span`
  display: inline-block;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  &.valid {
    color: #37b24d;
  }
  &.notValid {
    color: #f03e3e;
  }
`;

class JoinForm extends Component {
  render() {
    const {
      id,
      email,
      password,
      passwordConfirm,
      nickname,
      onChange,
      onBlur,
      onSubmit,
      onCancel
    } = this.props;
    const isCanSubmit =
      id.isValid &&
      email.isValid &&
      password.isValid &&
      passwordConfirm.isValid &&
      nickname.isValid;

    return (
      <Form
        onSubmit={
          isCanSubmit
            ? onSubmit
            : e => {
                e.preventDefault();
                return false;
              }
        }
      >
        <input
          name="id"
          placeholder="아이디"
          value={id.value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {id.msg !== '' && (
          <Msg className={id.isValid ? 'valid' : 'notValid'}>{id.msg}</Msg>
        )}
        <input
          name="email"
          placeholder="이메일"
          type="email"
          value={email.value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {email.msg !== '' && (
          <Msg className={email.isValid ? 'valid' : 'notValid'}>
            {email.msg}
          </Msg>
        )}
        <input
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password.value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {password.msg !== '' && (
          <Msg className={password.isValid ? 'valid' : 'notValid'}>
            {password.msg}
          </Msg>
        )}
        <input
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          value={passwordConfirm.value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {passwordConfirm.msg !== '' && (
          <Msg className={passwordConfirm.isValid ? 'valid' : 'notValid'}>
            {passwordConfirm.msg}
          </Msg>
        )}
        <input
          name="nickname"
          placeholder="닉네임"
          value={nickname.value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {nickname.msg !== '' && (
          <Msg className={nickname.isValid ? 'valid' : 'notValid'}>
            {nickname.msg}
          </Msg>
        )}
        <button className={isCanSubmit ? 'green' : 'gray'}>가입하기</button>
        <button className="blue" onClick={onCancel}>
          취소
        </button>
      </Form>
    );
  }
}

export default JoinForm;
