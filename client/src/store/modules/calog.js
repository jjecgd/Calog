import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const LOGOUT = 'calog/LOGOUT';
const INITIALIZE = 'calog/INITIALIZE';
const SET_POSTS = 'calog/SET_POSTS';
const CHANGE_INPUT = 'calog/CHANGE_INPUT';
const POST_START = 'calog/POST_START';
const POST_VIEW = 'calog/POST_VIEW';
const POST_MODIFY = 'calog/POST_MODIFY';
const TODO_ADD = 'calog/TODO_ADD';
const TODO_REMOVE = 'calog/TODO_REMOVE';
const TODO_TOGGLE = 'calog/TODO_TOGGLE';

export const logout = createAction(LOGOUT);
export const initialize = createAction(INITIALIZE);
export const setPosts = createAction(SET_POSTS, posts => ({
  posts
}));
export const changeInput = createAction(CHANGE_INPUT, (target, value) => ({
  target,
  value
}));
export const postStart = createAction(POST_START);
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
export const todoToggle = createAction(TODO_TOGGLE, (postIndex, todoId) => ({
  postIndex,
  todoId
}));

const initialState = {
  popupMode: '',
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
  posts: []
};

export default handleActions(
  {
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
      }),
    [SET_POSTS]: (state, action) =>
      produce(state, draft => {
        draft.posts = action.payload.posts;
      }),
    [CHANGE_INPUT]: (state, action) =>
      produce(state, draft => {
        draft.writeForm[action.payload.target] = action.payload.value;
      }),
    [POST_START]: (state, action) =>
      produce(state, draft => {
        draft.popupMode = 'write';
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
        const targetPost = draft.posts[action.payload.postIndex];
        const targetTodoIndex = targetPost.todoContent.findIndex(
          todo => todo.todoId === action.payload.todoId
        );
        const targetTodo = targetPost.todoContent[targetTodoIndex];
        targetTodo.isPerform = !targetTodo.isPerform;
      })
  },
  initialState
);
