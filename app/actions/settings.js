// @flow
export const SET_LOG_FILE = 'SET_LOG_FILE';
export const SET_STARTING_PHRASE = 'SET_STARTING_PHRASE';
export const SET_ROLL_LIMIT = 'SET_ROLL_LIMIT';
export const SET_TIME_LIMIT = 'SET_TIME_LIMIT';
export const SET_AUTO_CLIPBOARD = 'SET_AUTO_CLIPBOARD';

export function setLogFile(filePath: string) {
  return {
    type: SET_LOG_FILE,
    payload: filePath
  };
}

export function setStartingPhrase(startingPhrase: string) {
  return {
    type: SET_STARTING_PHRASE,
    payload: startingPhrase
  };
}

export function setRollLimit(limit: string) {
  return {
    type: SET_ROLL_LIMIT,
    payload: limit
  };
}

export function setTimeLimit(timeLimit: string) {
  return {
    type: SET_TIME_LIMIT,
    payload: timeLimit
  };
}

export function setAutoClipboard(autoClipboard: boolean) {
  return {
    type: SET_AUTO_CLIPBOARD,
    payload: autoClipboard
  };
}
