import { cancel, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import { Tail } from 'tail';
import * as actions from '../actions/parser';

const getSettings = state => state.settings;
const getParser = state => state.parser;
const timestampRegex = new RegExp('^\\[.*\\]\\s');
const startRollRegex = new RegExp('^\\*\\*A Magic Die is rolled by (.*)\\.$');
const endRollRegex = new RegExp('^\\*\\*It could have been any number from 0 to ([0-9]+), but this time it turned up a ([0-9]+)\\.$');
const tailChannel = channel();

export function* beginParsing() {
  const settings = yield select(getSettings);
  const tail = new Tail(settings.logFile);
  yield put(actions.setParsing(true));

  if (settings.startingPhrase.length === 0) {
    yield put(actions.setStatus('collecting rolls'));
  } else {
    yield put(actions.setStatus('awaiting phrase'));
  }

  tail.on('line', (data) => {
    const timelessData = data.replace(timestampRegex, '');
    tailChannel.put(actions.newLine(timelessData));
  });

  try {
    while(true) { // eslint-disable-line
      const action = yield take(tailChannel);
      yield put(action);
    }
  } finally {
    yield put(actions.setParsing(false));
    yield put(actions.setStatus('inactive'));
    tail.unwatch();
  }
}

export function* parseNewLine(action) {
  const settings = yield select(getSettings);
  const parser = yield select(getParser);
  const line = action.payload;
  if (parser.status === 'awaiting phrase' || parser.status === 'collecting rolls') {
    const match = new RegExp(`^${settings.startingPhrase}`).exec(line);
    if (match !== null) {
      yield put(actions.resetRolls());
      yield put(actions.setStatus('collecting rolls'));
      return;
    }
    const startRollMatch = startRollRegex.exec(line);
    if (startRollMatch !== null) {
      yield put(actions.newRollStart(startRollMatch[1]));
    } else {
      const endRollMatch = endRollRegex.exec(line);
      if (endRollMatch !== null) {
        const rollLimit = parseInt(endRollMatch[1], 10);
        const rollValue = parseInt(endRollMatch[2], 10);
        yield put(actions.newRollEnd({ rollLimit, rollValue }));
      }
    }
  }
}

export function* reset() {
  const settings = yield select(getSettings);
  const parser = yield select(getParser);
  yield put(actions.resetRolls());
  if (parser.status === 'inactive') {
    return;
  }
  if (settings.startingPhrase.length === 0) {
    yield put(actions.setStatus('collecting rolls'));
  } else {
    yield put(actions.setStatus('awaiting phrase'));
  }
}

export function* parseManager() {
  const parseWorker = yield fork(beginParsing);
  yield takeEvery(actions.NEW_LINE, parseNewLine);
  yield take(actions.END_PARSING);
  yield cancel(parseWorker);
}

export function* rollBuilder(action) {
  const playerName = action.payload;
  const parser = yield select(getParser);
  const settings = yield select(getSettings);

  const result = yield take([actions.END_PARSING, actions.RESET_ROLLS, actions.NEW_ROLL_END]);
  if (result.type !== actions.NEW_ROLL_END) {
    return;
  }
  const { rollLimit, rollValue } = result.payload;

  if (settings.rollLimit === rollLimit) {
    if (!parser.rolls.find((roll) => roll.playerName === playerName)) {
      yield put(actions.addRoll({ playerName, rollValue }));
    }
  }
}
