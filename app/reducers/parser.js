// @flow
import { SET_STATUS, SET_PARSING, ADD_ROLL, RESET_ROLLS, SET_DETECTED_PHRASE } from '../actions/parser';

type actionType = {
  type: string,
  payload: ?any
};

export type rollType = {
  playerName: string,
  rollValue: number
};

export type parserStateType = {
  parsing: boolean,
  rolls: Array<rollType>,
  status: string,
  detectedPhrase?: string
};

const initialState = {
  parsing: false,
  rolls: [],
  status: 'inactive',
  detectedPhrase: ''
};

export default function parser(state: parserStateType = initialState, action: actionType) {
  switch (action.type) {
    case SET_PARSING:
      return { ...state, parsing: action.payload };
    case SET_STATUS:
      return { ...state, status: action.payload };
    case ADD_ROLL:
      return {
        ...state,
        rolls: [...state.rolls, action.payload].sort((a, b) => b.rollValue - a.rollValue) // eslint-disable-line
      };
    case RESET_ROLLS:
      return { ...state, rolls: [], detectedPhrase: '' };
    case SET_DETECTED_PHRASE:
      return { ...state, detectedPhrase: action.payload };
    default:
      return state;
  }
}
