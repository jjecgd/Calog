import { combineReducers } from 'redux';
import login from './login';
import join from './join';
import calog from './calog';

export default combineReducers({
  login,
  join,
  calog
});
