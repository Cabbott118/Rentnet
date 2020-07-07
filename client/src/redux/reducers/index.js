import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  UI: uiReducer,
});
