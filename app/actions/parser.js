// @flow
import type { rollType } from '../reducers/parser';

export const BEGIN_PARSING = 'BEGIN_PARSING';
export const END_PARSING = 'END_PARSING';
export const NEW_ROLL_START = 'NEW_ROLL_START';
export const NEW_ROLL_END = 'NEW_ROLL_END';
export const ADD_ROLL = 'ADD_ROLL';
export const RESET_ROLLS = 'RESET_ROLLS';
export const SET_STATUS = 'SET_STATUS';
export const SET_PARSING = 'SET_PARSING';
export const SET_DETECTED_PHRASE = 'SET_DETECTED_PHRASE';
export const COUNTDOWN_ENDED = 'COUNTDOWN_ENDED';
export const NEW_LINE = 'NEW_LINE';
export const RESET = 'RESET';

export function beginParsing() {
  return {
    type: BEGIN_PARSING
  };
}

export function endParsing() {
  return {
    type: END_PARSING
  };
}

export function resetRolls() {
  return {
    type: RESET_ROLLS
  };
}

export function addRoll(roll: rollType) {
  return {
    type: ADD_ROLL,
    payload: roll
  };
}

export function newRollStart(playerName: string) {
  return {
    type: NEW_ROLL_START,
    payload: playerName
  };
}

export function newRollEnd(line: {}) {
  return {
    type: NEW_ROLL_END,
    payload: line
  };
}

export function setStatus(status: string) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function setParsing(parsing: boolean) {
  return {
    type: SET_PARSING,
    payload: parsing
  };
}

export function setDetectedPhrase(detectedPhrase: string) {
  return {
    type: SET_DETECTED_PHRASE,
    payload: detectedPhrase
  };
}

export function newLine(data: string) {
  return {
    type: NEW_LINE,
    payload: data
  };
}

export function reset() {
  return {
    type: RESET
  };
}

export function countdownEnded() {
  return {
    type: COUNTDOWN_ENDED
  };
}
