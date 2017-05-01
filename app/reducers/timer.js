// @flow
import { RESET_TIMER, START_TIMER, STOP_TIMER } from '../actions/timer';

type actionType = {
  type: string,
  payload: any
};

export type timerStateType = {
  active: boolean,
  startTime?: number
};

const initialState = {
  active: false
};

export default function timer(state: timerStateType = initialState, action: actionType) {
  switch (action.type) {
    case START_TIMER:
      return { ...state, startTime: action.payload, active: true };
    case STOP_TIMER:
      return { ...state, active: false };
    case RESET_TIMER:
      return { ...state, startTime: action.payload };
    default:
      return state;
  }
}
