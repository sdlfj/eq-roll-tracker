import { takeLatest, takeEvery } from 'redux-saga/effects';
import { fork } from 'redux-saga/effects';
import { rollBuilder, parseManager, reset } from './parser';
import { RESET, NEW_ROLL_START, BEGIN_PARSING } from '../actions/parser';

export default function* sagas() {
  yield [
    fork(takeLatest, RESET, reset),
    fork(takeLatest, NEW_ROLL_START, rollBuilder),
    fork(takeLatest, BEGIN_PARSING, parseManager)
  ];
}
