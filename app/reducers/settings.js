// @flow
import { SET_LOG_FILE, SET_STARTING_PHRASE, SET_ROLL_LIMIT } from '../actions/settings';

export type settingsStateType = {
  logFile: string,
  startingPhrase: string,
  rollLimit: number
};

type actionType = {
  type: string,
  payload: any
};

const initialState = {
  logFile: '',
  startingPhrase: 'You shout, \'roll for',
  rollLimit: 100
};

export default function settings(state: settingsStateType = initialState, action: actionType) {
  switch(action.type) {
    case SET_LOG_FILE:
      return {...state, logFile: action.payload};
    case SET_STARTING_PHRASE:
      return {...state, startingPhrase: action.payload};
    case SET_ROLL_LIMIT:
      return {...state, rollLimit: action.payload};
    default:
      return state
  }
}
