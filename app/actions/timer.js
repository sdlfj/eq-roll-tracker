// @flow
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const RESET_TIMER = 'RESET_TIMER';

export function startTimer() {
  return {
    type: START_TIMER,
    payload: Date.now()
  };
}

export function stopTimer() {
  return {
    type: STOP_TIMER,
    payload: Date.now()
  };
}

export function resetTimer() {
  return {
    type: RESET_TIMER,
    payload: Date.now()
  };
}
