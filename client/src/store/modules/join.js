import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const INITIALIZE_FORM = 'join/INITIALIZE_FORM';
const JOIN = 'join/JOIN';
const CHANGE_INPUT = 'join/CHANGE_INPUT';
const BLUR_INPUT = 'join/BLUR_INPUT';

export const initializeForm = createAction(INITIALIZE_FORM);
export const join = createAction(JOIN);
export const changeInput = createAction(CHANGE_INPUT, (target, value) => ({
  target,
  value
}));
export const blurInput = createAction(BLUR_INPUT, data => ({
  target: data.target,
  isValid: data.isValid,
  msg: data.msg
}));

const initialState = {
  id: { value: '', isValid: false, msg: '' },
  email: { value: '', isValid: false, msg: '' },
  password: { value: '', isValid: false, msg: '' },
  passwordConfirm: { value: '', isValid: false, msg: '' },
  nickname: { value: '', isValid: false, msg: '' }
};

export default handleActions(
  {
    [INITIALIZE_FORM]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) =>
      produce(state, draft => {
        draft[action.payload.target].value = action.payload.value;
      }),
    [BLUR_INPUT]: (state, action) =>
      produce(state, draft => {
        draft[action.payload.target].isValid = action.payload.isValid;
        draft[action.payload.target].msg = action.payload.msg;
      })
  },
  initialState
);
