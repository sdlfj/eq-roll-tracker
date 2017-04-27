// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(sagaMiddleware, thunk, router);

function configureStore(initialState) {
  const store =createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(sagas);
  return store
}

export default { configureStore, history };
