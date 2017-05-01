// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import settings from './settings';
import parser from './parser';
import timer from './timer';

const rootReducer = combineReducers({
  router,
  settings,
  parser,
  timer
});

export default rootReducer;
