// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import settings from './settings';
import parser from './parser';

const rootReducer = combineReducers({
  router,
  settings,
  parser
});

export default rootReducer;
