import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const LOGIN = 'login/LOGIN';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'login/LOGIN_FAILURE';
const CHANGE_INPUT = 'login/CHANGE_INPUT';
const LOGOUT = 'login/LOGOUT';

export const login = (ifAlreadyLogin, userLoginForm) => dispatch => {
  dispatch({ type: LOGIN });
  if (ifAlreadyLogin) {
    const userId = window.localStorage.getItem('id');
    const userNickname = window.localStorage.getItem('nickname');

    if (
      userId !== 'undefined' &&
      userNickname !== 'undefined' &&
      (userId !== null && userNickname !== null) &&
      (userId !== undefined && userNickname !== undefined)
    ) {
      axios
        .post('/api/account/autoLogin/', { id: userId })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { id: userId, nickname: userNickname }
      });
    } else {
      dispatch({ type: LOGIN_FAILURE });
    }
  } else {
    return axios
      .post('/api/account/login/', userLoginForm)
      .then(res => {
        if (res.data.status === 'FAILURE') {
          alert(res.data.msg);
          return;
        } else if (res.data.status === 'SUCCESS') {
          window.localStorage.setItem('id', res.data.id);
          window.localStorage.setItem('nickname', res.data.nickname);
          return res;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
export const changeInput = createAction(CHANGE_INPUT, (target, value) => ({
  target,
  value
}));
export const logout = createAction(LOGOUT);

const initialState = {
  status: '',
  userId: '',
  userNickname: '',
  id: '',
  password: ''
};

export default handleActions(
  {
    [LOGIN]: (state, action) => ({
      ...state,
      status: 'LOADING'
    }),
    [LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      status: 'SUCCESS',
      userId: action.payload.id,
      userNickname: action.payload.nickname,
      id: '',
      password: ''
    }),
    [LOGIN_FAILURE]: (state, action) => ({
      ...state,
      status: 'FAILURE',
      userId: '',
      userNickname: '',
      id: '',
      password: ''
    }),
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      [action.payload.target]: action.payload.value
    }),
    [LOGOUT]: (state, action) => initialState
  },
  initialState
);
