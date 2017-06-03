import { cancel, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import { Tail } from 'tail';
import { clipboard } from 'electron';
import * as actions from '../actions/parser';
import { startTimer, stopTimer } from '../actions/timer';

const getSettings = state => state.settings;
const getParser = state => state.parser;
const getWinners = state => {
  const topRoll = state.parser.rolls[0];
  if (topRoll) {
    const topRolls = state.parser.rolls.filter((r) => r.rollValue === topRoll.rollValue);
    return topRolls;
  }
};
const timestampRegex = new RegExp('^\\[.*\\]\\s');
const startRollRegex = new RegExp('^\\*\\*A Magic Die is rolled by (.*)\\.$');
const endRollRegex = new RegExp('^\\*\\*It could have been any number from 0 to ([0-9]+), but this time it turned up a ([0-9]+)\\.$');
const tailChannel = channel();
// let timeout = null;

export function* beginParsing() {
  const settings = yield select(getSettings);
  const tail = new Tail(settings.logFile, { fsWatchOptions: {interval: 1000}, useWatchFile: true });
  yield put(actions.setParsing(true));

  yield put(actions.resetRolls());
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
  const timeLimit = settings.timeLimit;
  if (parser.status === 'awaiting phrase'
    || parser.status === 'ended - awaiting next phrase'
    || parser.status === 'collecting rolls') {
    const match = new RegExp(`^${settings.startingPhrase}`).exec(line);
    if (match !== null && settings.startingPhrase.length > 0) {
      yield put(actions.resetRolls());
      yield put(actions.setStatus('collecting rolls'));
      yield put(actions.setDetectedPhrase(line));
      if (timeLimit !== undefined && !isNaN(timeLimit) && !isNaN(parseInt(timeLimit, 10))) {
        yield put(startTimer());
      }

      return;
    }

    if (parser.status === 'collecting rolls') {
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
}

export function* reset() {
  const settings = yield select(getSettings);
  const parser = yield select(getParser);
  yield put(actions.resetRolls());
  yield put(stopTimer());
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
  yield put(stopTimer());
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

  if (parseInt(settings.rollLimit, 10) === parseInt(rollLimit, 10)) {
    if (!parser.rolls.find((roll) => roll.playerName === playerName)) {
      yield put(actions.addRoll({ playerName, rollValue }));
    }
  }
}

export function* countdownEnded() {
  const settings = yield select(getSettings);
  yield put(actions.setStatus('ended - awaiting next phrase'));
  yield put(stopTimer());
  const winningRolls = yield select(getWinners);
  if (settings.autoClipboard && winningRolls && winningRolls.length > 0) {
    const names = winningRolls.map((r) => r.playerName).join(', ');
    clipboard.writeText(`${names} ${winningRolls[0].rollValue}`);
  }
}
