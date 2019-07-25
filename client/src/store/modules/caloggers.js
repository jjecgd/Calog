import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import axios from 'axios';

const GET_CALOGGERS = 'caloggers/GET_CALOGGERS';
const GET_CALOGGERS_SUCCESS = 'caloggers/GET_CALOGGERS_SUCCESS';
const GET_CALOGGERS_FAILURE = 'caloggers/GET_CALOGGERS_FAILURE';

export const getCaloggers = () => dispatch => {
  dispatch({ type: GET_CALOGGERS });
  axios
    .get('/api/account/getCaloggers/')
    .then(res => {
      dispatch({
        type: GET_CALOGGERS_SUCCESS,
        payload: { calogUsers: res.data }
      });
    })
    .catch(err => {
      dispatch({ type: GET_CALOGGERS_FAILURE });
    });
};

const initialState = {
  status: '',
  calogUsers: []
};

export default handleActions(
  {
    [GET_CALOGGERS]: (state, action) =>
      produce(state, draft => {
        draft.status = 'LOADING';
      }),
    [GET_CALOGGERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.status = 'SUCCESS';
        draft.calogUsers = action.payload.calogUsers;
      }),
    [GET_CALOGGERS_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.status = 'FAILURE';
      })
  },
  initialState
);
