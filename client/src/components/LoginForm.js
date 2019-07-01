import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -200px;
  width: 400px;
  height: 200px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: ${props => props.background};
`;

class LoginForm extends Component {
  state = {
    isJoin: false,
    joinForm: {
      id: '',
      password: '',
      username: '',
      nickname: '',
      email: '',
      checkRequire: {
        id: false,
        password: false,
        nickname: false
      }
    }
  };
  handleJoin = e => {
    e.preventDefault();
    this.setState({ isJoin: true });
  };
  handleJoinComplete = e => {
    const { joinForm } = this.state;
    const userAccount = {
      id: joinForm.id,
      password: joinForm.password,
      email: joinForm.email,
      created: undefined
    };
    e.preventDefault();
    axios
      .post('/api/account/join/', userAccount)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleJoinFormChange = e => {
    const { joinForm } = this.state;

    this.setState({
      joinForm: {
        ...joinForm,
        [e.target.name]: e.target.value
      }
    });
  };
  render() {
    const { handleJoin, handleJoinComplete, handleJoinFormChange } = this;
    const { onLoginFormChange, onLogin, loginForm } = this.props;
    const { id, password } = loginForm;
    const { isJoin, joinForm } = this.state;

    return (
      <div>
        {(() => {
          if (isJoin) {
            return (
              <Form onSubmit={handleJoinComplete}>
                <Input
                  name="id"
                  placeholder="아이디"
                  value={joinForm.id}
                  onChange={handleJoinFormChange}
                  onBlur={() => {
                    /*axios.get('/api/account/join')
                    .then(res => {
                      this.setState({isLogin: true});
                    })
                    .catch(err => {
                      console.log(err);
                    });*/
                  }}
                />
                <Input
                  name="password"
                  placeholder="비밀번호"
                  type="password"
                  value={joinForm.password}
                  onChange={handleJoinFormChange}
                />
                <Input
                  name="username"
                  placeholder="이름"
                  value={joinForm.username}
                  onChange={handleJoinFormChange}
                />
                <Input
                  name="nickname"
                  placeholder="닉네임"
                  value={joinForm.nickname}
                  onChange={handleJoinFormChange}
                />
                <Input
                  name="email"
                  placeholder="이메일"
                  type="email"
                  value={joinForm.email}
                  onChange={handleJoinFormChange}
                />
                <Button background={'#37b24d'}>가입하기</Button>
              </Form>
            );
          } else {
            return (
              <Form onSubmit={onLogin}>
                <Input
                  name="id"
                  placeholder="아이디"
                  value={id}
                  onChange={onLoginFormChange}
                />
                <Input
                  name="password"
                  placeholder="비밀번호"
                  type="password"
                  value={password}
                  onChange={onLoginFormChange}
                />
                <Button className="green">로그인</Button>
                <Button className="green" onClick={handleJoin}>
                  회원가입
                </Button>
              </Form>
            );
          }
        })()}
      </div>
    );
  }
}

export default LoginForm;
