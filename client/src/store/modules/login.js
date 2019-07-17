import { createAction, handleActions } from 'redux-actions';

const LOADING = 'login/LOADING';
const LOADING_SUCCESS = 'login/LOADING_SUCCESS';
const LOADING_FAILURE = 'login/LOADING_FAILURE';
const CHANGE_INPUT = 'login/CHANGE_INPUT';
const LOGIN = 'login/LOGIN';
const LOGOUT = 'login/LOGOUT';

export const loading = () => dispatch => {
  const userId = window.localStorage.getItem('id');
  const userNickname = window.localStorage.getItem('nickname');

  dispatch({ type: LOADING });
  if (window.localStorage != null) {
    dispatch({
      type: LOGIN,
      payload: {
        id: userId,
        nickname: userNickname
      }
    });
    dispatch({ type: LOADING_SUCCESS });
  } else {
    dispatch({ type: LOADING_FAILURE });
  }
};
export const loadingSuccess = createAction(LOADING_SUCCESS);
export const loadingFailure = createAction(LOADING_FAILURE);
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
  status: '',
  userId: '',
  userNickname: '',
  id: '',
  password: ''
};

export default handleActions(
  {
    [LOADING]: (state, action) => ({
      ...state,
      status: 'LOADING'
    }),
    [LOADING_SUCCESS]: (state, action) => ({
      ...state,
      status: 'SUCCESS'
    }),
    [LOADING_FAILURE]: (state, action) => ({
      ...state,
      status: 'FAILURE'
    }),
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      [action.payload.target]: action.payload.value
    }),
    [LOGIN]: (state, action) => ({
      ...state,
      userId: action.payload.id,
      userNickname: action.payload.nickname,
      id: '',
      password: ''
    }),
    [LOGOUT]: (state, action) => initialState
  },
  initialState
);
