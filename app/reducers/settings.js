// @flow
import {
  SET_LOG_FILE, SET_STARTING_PHRASE, SET_ROLL_LIMIT,
  SET_TIME_LIMIT, SET_AUTO_CLIPBOARD, SET_PLAY_SOUND
} from '../actions/settings';

export type settingsStateType = {
  logFile: string,
  startingPhrase: string,
  rollLimit: string,
  timeLimit?: string,
  autoClipboard: boolean,
  playSound: boolean
};

type actionType = {
  type: string,
  payload: any
};

const initialState = {
  logFile: '',
  startingPhrase: 'You shout, \'roll for',
  rollLimit: '100',
  timeLimit: '20',
  autoClipboard: false,
  playSound: false
};

export default function settings(state: settingsStateType = initialState, action: actionType) {
  switch (action.type) {
    case SET_LOG_FILE:
      localStorage.setItem('logFile', action.payload);
      return { ...state, logFile: action.payload };
    case SET_STARTING_PHRASE:
      localStorage.setItem('startingPhrase', action.payload);
      return { ...state, startingPhrase: action.payload };
    case SET_ROLL_LIMIT:
      localStorage.setItem('rollLimit', action.payload);
      return { ...state, rollLimit: action.payload };
    case SET_TIME_LIMIT:
      localStorage.setItem('timeLimit', action.payload);
      return { ...state, timeLimit: action.payload };
    case SET_AUTO_CLIPBOARD:
      localStorage.setItem('autoClipboard', action.payload);
      return { ...state, autoClipboard: action.payload };
    case SET_PLAY_SOUND:
      localStorage.setItem('playSound', action.payload);
      return { ...state, playSound: action.payload };
    default:
      return state;
  }
}
