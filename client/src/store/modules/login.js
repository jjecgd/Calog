import { createAction, handleActions } from 'redux-actions';

const CHANGE_INPUT = 'login/CHANGE_INPUT';
const LOGIN = 'login/LOGIN';
const LOGOUT = 'login/LOGOUT';

export const changeInput = createAction(CHANGE_INPUT, (target, value) => ({
  target,
  value
}));
export const login = createAction(LOGIN, (id, nickname) => ({
  id,
  nickname
}));
export const logout = createAction(LOGOUT);

const initialState = {
  isLogin: false,
  userId: '',
  userNickname: '',
  id: '',
  password: ''
};

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      [action.payload.target]: action.payload.value
    }),
    [LOGIN]: (state, action) => ({
      ...state,
      userId: action.payload.id,
      userNickname: action.payload.nickname,
      id: '',
      password: '',
      isLogin: true
    }),
    [LOGOUT]: (state, action) => initialState
  },
  initialState
);
