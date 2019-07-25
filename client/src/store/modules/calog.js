import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import produce from 'immer';
import { replaceZero } from '../../utils/number';

const LOADING = 'calog/LOADING';
const LOADING_SUCCESS = 'calog/LOADING_SUCCESS';
const LOADING_FAILURE = 'calog/LOADING_FAILURE';
const LOGOUT = 'calog/LOGOUT';
const INITIALIZE = 'calog/INITIALIZE';
const CHANGE_ACTIVE_DATE = 'calog/CHANGE_ACTIVE_DATE';
const CHANGE_INPUT = 'calog/CHANGE_INPUT';
const POST_VIEW = 'calog/POST_VIEW';
const POST_MODIFY = 'calog/POST_MODIFY';
const TODO_ADD = 'calog/TODO_ADD';
const TODO_REMOVE = 'calog/TODO_REMOVE';
const TODO_TOGGLE = 'calog/TODO_TOGGLE';
const VISIT_CALOG = 'calog/VISIT_CALOG';
const EXIT_CALOG = 'calog/EXIT_CALOG';

export const loading = (currentCalog, year, month) => dispatch => {
  dispatch({ type: LOADING });
  axios
    .get(`/api/post/${currentCalog}/${year}/${month}`)
    .then(res => {
      dispatch({
        type: LOADING_SUCCESS,
        payload: { posts: res.data, year, month }
      });
    })
    .catch(err => {
      dispatch({ type: LOADING_FAILURE });
      console.log(err);
    });
};
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
export const postView = createAction(POST_VIEW, (index, id) => ({
  index,
  id
}));
export const postModify = createAction(POST_MODIFY, beforeForm => ({
  beforeForm
}));
export const todoAdd = createAction(TODO_ADD, (todoId, todo) => ({
  todoId,
  todo
}));
export const todoRemove = createAction(TODO_REMOVE, todoId => ({ todoId }));
export const todoToggle = createAction(
  TODO_TOGGLE,
  (postId, todoId, year, month, date) => ({
    postId,
    todoId,
    year,
    month,
    date
  })
);
export const visitCalog = createAction(VISIT_CALOG, currentDate => ({
  currentDate
}));
export const exitCalog = createAction(EXIT_CALOG);

const initialState = {
  status: '',
  currentDate: new Date(),
  writeForm: {
    title: '',
    content: '',
    todoTitle: '',
    todoContent: []
  },
  targetDate: {
    year: '',
    month: ''
  },
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

        if (
          draft.posts[action.payload.year] &&
          draft.posts[action.payload.year][action.payload.month]
        ) {
          draft.posts[action.payload.year][action.payload.month] = {};
        }

        if (action.payload.posts.length > 0) {
          action.payload.posts.forEach(post => {
            if (draft.posts[post.date.year] === undefined) {
              draft.posts[post.date.year] = {};
              draft.posts[post.date.year][post.date.month] = {};
              draft.posts[post.date.year][post.date.month][post.date.date] = [];
              draft.posts[post.date.year][post.date.month][post.date.date].push(
                post
              );
            } else {
              if (draft.posts[post.date.year][post.date.month] === undefined) {
                draft.posts[post.date.year][post.date.month] = {};
                draft.posts[post.date.year][post.date.month][
                  post.date.date
                ] = [];
                draft.posts[post.date.year][post.date.month][
                  post.date.date
                ].push(post);
              } else {
                if (
                  draft.posts[post.date.year][post.date.month][
                    post.date.date
                  ] === undefined
                ) {
                  draft.posts[post.date.year][post.date.month][
                    post.date.date
                  ] = [];
                  draft.posts[post.date.year][post.date.month][
                    post.date.date
                  ].push(post);
                } else {
                  draft.posts[post.date.year][post.date.month][
                    post.date.date
                  ].push(post);
                }
              }
            }
          });
        } else {
          if (draft.posts[action.payload.year] === undefined) {
            draft.posts[action.payload.year] = {};
            draft.posts[action.payload.year][action.payload.month] = {};
          } else {
            draft.posts[action.payload.year][action.payload.month] = {};
          }
        }
      }),
    [LOADING_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.status = 'FAILURE';
      }),
    [LOGOUT]: (state, action) =>
      produce(state, draft => {
        draft.status = '';
      }),
    [INITIALIZE]: (state, action) =>
      produce(state, draft => {
        draft.writeForm = {
          title: '',
          content: '',
          todoTitle: '',
          todoContent: []
        };
      }),
    [CHANGE_ACTIVE_DATE]: (state, action) =>
      produce(state, draft => {
        const targetMonth = action.payload.currentDate.getMonth() + 1;
        draft.status = 'LOADING';
        draft.targetDate = {
          year: action.payload.currentDate.getFullYear().toString(),
          month: replaceZero(targetMonth)
        };
        draft.currentDate = action.payload.currentDate;
      }),
    [CHANGE_INPUT]: (state, action) =>
      produce(state, draft => {
        draft.writeForm[action.payload.target] = action.payload.value;
      }),
    [POST_MODIFY]: (state, action) =>
      produce(state, draft => {
        draft.writeForm = action.payload.beforeForm;
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
        const targetPost = draft.posts[action.payload.year][
          action.payload.month
        ][action.payload.date].find(post => post._id === action.payload.postId);
        const targetTodoIndex = targetPost.todoContent.findIndex(
          todo => todo.todoId === action.payload.todoId
        );
        const targetTodo = targetPost.todoContent[targetTodoIndex];
        targetTodo.isPerform = !targetTodo.isPerform;
      }),
    [VISIT_CALOG]: (state, action) =>
      produce(state, draft => {
        const targetMonth = action.payload.currentDate.getMonth() + 1;
        draft.status = 'LOADING';
        draft.targetDate = {
          year: action.payload.currentDate.getFullYear().toString(),
          month: replaceZero(targetMonth)
        };
        draft.currentDate = action.payload.currentDate;
        draft.posts = {};
      }),
    [EXIT_CALOG]: (state, action) =>
      produce(state, draft => {
        draft.status = '';
        draft.posts = {};
      })
  },
  initialState
);
