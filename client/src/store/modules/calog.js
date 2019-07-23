import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import produce from 'immer';

const LOGOUT = 'calog/LOGOUT';
const INITIALIZE = 'calog/INITIALIZE';
const CHANGE_ACTIVE_DATE = 'calog/CHANGE_ACTIVE_DATE';
const CHANGE_INPUT = 'calog/CHANGE_INPUT';
const POST_START = 'calog/POST_START';
const POST_LIST_VIEW = 'calog/POST_LIST_VIEW';
const POST_VIEW = 'calog/POST_VIEW';
const POST_MODIFY = 'calog/POST_MODIFY';
const TODO_ADD = 'calog/TODO_ADD';
const TODO_REMOVE = 'calog/TODO_REMOVE';
const TODO_TOGGLE = 'calog/TODO_TOGGLE';
const VISIT_CALOG = 'calog/VISIT_CALOG';
const LOADING = 'calog/LOADING';
const LOADING_SUCCESS = 'calog/LOADING_SUCCESS';
const LOADING_FAILURE = 'calog/LOADING_FAILURE';

export const logout = createAction(LOGOUT);
export const initialize = createAction(INITIALIZE);
export const changeActiveDate = createAction(
  CHANGE_ACTIVE_DATE,
  currentDate => ({
    currentDate
  })
);
export const changeInput = createAction(CHANGE_INPUT, (target, value) => ({
  target,
  value
}));
export const postStart = createAction(POST_START);
export const postListView = createAction(POST_LIST_VIEW, targetDate => ({
  targetDate
}));
export const postView = createAction(POST_VIEW, (index, id) => ({
  index,
  id
}));
export const postModify = createAction(
  POST_MODIFY,
  (beforeForm, index, id) => ({
    beforeForm,
    index,
    id
  })
);
export const todoAdd = createAction(TODO_ADD, (todoId, todo) => ({
  todoId,
  todo
}));
export const todoRemove = createAction(TODO_REMOVE, todoId => ({ todoId }));
export const todoToggle = createAction(
  TODO_TOGGLE,
  (targetDate, postIndex, todoId) => ({
    targetDate,
    postIndex,
    todoId
  })
);
export const visitCalog = createAction(
  VISIT_CALOG,
  (showCalogId, currentDate) => ({
    showCalogId,
    currentDate
  })
);
export const loading = (showCalogId, year, month) => dispatch => {
  dispatch({ type: LOADING });
  month++;
  axios
    .get(`/api/post/${showCalogId}/${year}/${month < 10 ? '0' + month : month}`)
    .then(res => {
      dispatch({ type: LOADING_SUCCESS, payload: { posts: res.data } });
    })
    .catch(err => {
      dispatch({ type: LOADING_FAILURE });
      console.log(err);
    });
};

const initialState = {
  status: '',
  popupMode: '',
  currentDate: new Date(),
  writeForm: {
    title: '',
    content: '',
    todoTitle: '',
    todoContent: []
  },
  viewPostIndex: -1,
  viewPostId: -1,
  modifyPostIndex: -1,
  modifyPostId: -1,
  targetDate: 0,
  showCalogId: '',
  posts: {}
};

export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.status = 'LOADING';
      }),
    [LOADING_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.status = 'SUCCESS';
        draft.posts = {};
        action.payload.posts.map(post => {
          if (!draft.posts[post.date.date]) {
            draft.posts[post.date.date] = [];
            draft.posts[post.date.date].push(post);
          } else {
            draft.posts[post.date.date].push(post);
          }
        });
      }),
    [LOADING_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.status = 'FAILURE';
      }),
    [LOGOUT]: (state, action) =>
      produce(state, draft => {
        draft.popupMode = '';
        draft.writeForm = {
          title: '',
          content: '',
          todoTitle: '',
          todoContent: []
        };
        draft.viewPostIndex = -1;
        draft.viewPostId = -1;
        draft.modifyPostIndex = -1;
        draft.modifyPostId = -1;
        draft.targetDate = 0;
        draft.showCalogId = '';
        draft.posts = [];
      }),
    [INITIALIZE]: (state, action) =>
      produce(state, draft => {
        draft.popupMode = '';
        draft.writeForm = {
          title: '',
          content: '',
          todoTitle: '',
          todoContent: []
        };
        draft.viewPostIndex = -1;
        draft.viewPostId = -1;
        draft.modifyPostIndex = -1;
        draft.modifyPostId = -1;
        draft.targetDate = 0;
      }),
    [CHANGE_ACTIVE_DATE]: (state, action) =>
      produce(state, draft => {
        draft.currentDate = action.payload.currentDate;
      }),
    [CHANGE_INPUT]: (state, action) =>
      produce(state, draft => {
        draft.writeForm[action.payload.target] = action.payload.value;
      }),
    [POST_START]: (state, action) =>
      produce(state, draft => {
        draft.popupMode = 'write';
      }),
    [POST_LIST_VIEW]: (state, action) =>
      produce(state, draft => {
        draft.popupMode = 'list';
        draft.targetDate = action.payload.targetDate;
      }),
    [POST_VIEW]: (state, action) =>
      produce(state, draft => {
        draft.popupMode = 'view';
        draft.viewPostIndex = action.payload.index;
        draft.viewPostId = action.payload.id;
      }),
    [POST_MODIFY]: (state, action) =>
      produce(state, draft => {
        draft.popupMode = 'modify';
        draft.writeForm = action.payload.beforeForm;
        draft.modifyPostIndex = action.payload.index;
        draft.modifyPostId = action.payload.id;
      }),
    [TODO_ADD]: (state, action) =>
      produce(state, draft => {
        draft.writeForm.todoTitle = '';
        draft.writeForm.todoContent.push({
          todoId: action.payload.todoId,
          todo: action.payload.todo,
          isPerform: false
        });
      }),
    [TODO_REMOVE]: (state, action) =>
      produce(state, draft => {
        const targetTodoIndex = draft.writeForm.todoContent.findIndex(
          todo => todo.todoId === action.payload.todoId
        );
        draft.writeForm.todoContent.splice(targetTodoIndex, 1);
      }),
    [TODO_TOGGLE]: (state, action) =>
      produce(state, draft => {
        const targetPost =
          draft.posts[action.payload.targetDate][action.payload.postIndex];
        const targetTodoIndex = targetPost.todoContent.findIndex(
          todo => todo.todoId === action.payload.todoId
        );
        const targetTodo = targetPost.todoContent[targetTodoIndex];
        targetTodo.isPerform = !targetTodo.isPerform;
      }),
    [VISIT_CALOG]: (state, action) =>
      produce(state, draft => {
        draft.currentDate = action.payload.currentDate;
        draft.showCalogId = action.payload.showCalogId;
      })
  },
  initialState
);
