import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import * as settingsActions from './actions/settings';

const store = configureStore();

const logFile = localStorage.getItem('logFile');
const startingPhrase = localStorage.getItem('startingPhrase');
const rollLimit = localStorage.getItem('rollLimit');
const timeLimit = localStorage.getItem('timeLimit');
const autoClipboard = localStorage.getItem('autoClipboard');
const playSound = localStorage.getItem('playSound');

if (logFile !== null) {
  store.dispatch(settingsActions.setLogFile(logFile));
}

if (startingPhrase !== null) {
  store.dispatch(settingsActions.setStartingPhrase(startingPhrase));
}

if (rollLimit !== null) {
  store.dispatch(settingsActions.setRollLimit(rollLimit));
}

if (timeLimit !== null) {
  store.dispatch(settingsActions.setTimeLimit(timeLimit));
}

if (autoClipboard !== null && autoClipboard === 'true') {
  store.dispatch(settingsActions.setAutoClipboard(true));
}

if (playSound !== null && playSound === 'true') {
  store.dispatch(settingsActions.setPlaySound(true));
}

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
