import { takeLatest, fork } from 'redux-saga/effects';
import { rollBuilder, parseManager, reset, countdownEnded } from './parser';
import { RESET, NEW_ROLL_START, BEGIN_PARSING, COUNTDOWN_ENDED } from '../actions/parser';

export default function* sagas() {
  yield [
    fork(takeLatest, RESET, reset),
    fork(takeLatest, NEW_ROLL_START, rollBuilder),
    fork(takeLatest, BEGIN_PARSING, parseManager),
    fork(takeLatest, COUNTDOWN_ENDED, countdownEnded)
  ];
}
