// @flow
export const SET_LOG_FILE = 'SET_LOG_FILE';
export const SET_STARTING_PHRASE = 'SET_STARTING_PHRASE';
export const SET_ROLL_LIMIT = 'SET_ROLL_LIMIT';

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

export function setRollLimit(limit: number) {
  return {
    type: SET_ROLL_LIMIT,
    payload: limit
  };
}
