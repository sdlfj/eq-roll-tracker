// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ParserActions from '../actions/parser';
import styles from './Parser.css';
import RollList from './RollList';
import type { rollType } from '../reducers/parser';
import soundFile from '../sound/sound.wav';

const getTimeLeft = (startTime: number, limit: number) =>
  Math.ceil((limit - (new Date().getTime() - startTime)) / 1000);
// const soundFile = '../app/sound/sound.wav';

class Parser extends Component {
  state: {
    timeLeft: number
  };

  props: {
    beginParsing: () => void,
    endParsing: () => void,
    countdownEnded: () => void,
    parsing: boolean,
    rolls: Array<rollType>,
    validSettings: boolean,
    reset: () => void,
    status: string,
    timerActive: boolean,
    timerStartTime: number,
    timeLimit?: number,
    startingPhrase: string,
    detectedPhrase: string,
    playSound: boolean
  }

  countdownTimeout: ?number;
  countdownInterval: ?number;

  static defaultProps = {
    timerStartTime: 0,
    timeLimit: undefined
  }

  constructor(props) {
    super(props);
    this.audio = new Audio(soundFile); // eslint-disable-line
    this.state = { timeLeft: props.timeLimit };
  }

  componentDidUpdate(prevProps) {
    const { timerActive, timerStartTime } = this.props;

    if (timerActive === true &&
      (prevProps.timerActive === false ||
       prevProps.timerStartTime !== timerStartTime)) {
      this.startCountdown();
    } else if (prevProps.timerActive === true && timerActive === false) {
      this.clearTimers();
    }
  }

  clearTimers() {
    if (this.countdownTimeout) {
      clearTimeout(this.countdownTimeout);
      this.countdownTimeout = null;
    }

    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  startCountdown() {
    const { timeLimit, timerStartTime, playSound } = this.props;
    this.clearTimers();

    if (timeLimit !== undefined && !isNaN(timeLimit) && !isNaN(parseInt(timeLimit, 10))) {
      this.setState({ timeLeft: timeLimit });
      this.countdownInterval = setInterval(() => {
        this.setState({ timeLeft: getTimeLeft(timerStartTime, timeLimit * 1000) });
      }, 1000);

      this.countdownTimeout = setTimeout(() => {
        if(playSound === true) {
          this.audio.play(); // eslint-disable-line
        }
        this.props.countdownEnded();
      }, timeLimit * 1000);
    }
  }

  handleBeginParsingClick() {
    const { beginParsing } = this.props;
    beginParsing();
  }

  handleEndParsingClick() {
    const { endParsing } = this.props;
    endParsing();
  }

  render() {
    const {
      parsing, validSettings, rolls,
      status, beginParsing, endParsing,
      reset, timerActive, timeLimit,
      startingPhrase, detectedPhrase
    } = this.props;

    const { timeLeft } = this.state;

    let timeString = null;
    if (status === 'ended - awaiting next phrase') {
      timeString = <span><b> Time:</b> 0</span>;
    } else if (startingPhrase.length > 0) {
      if (timerActive) {
        timeString = <span><b> Time:</b> {timeLeft}</span>;
      } else if (timeLimit) {
        timeString = <span><b> Time:</b> {timeLimit}</span>;
      }
    }

    return (
      <div className={styles.parser}>
        <div className={styles.menu}>
          <button disabled={parsing || !validSettings} onClick={beginParsing}>Begin Parsing</button>
          <button onClick={reset}>Reset</button>
          <button disabled={!parsing} onClick={endParsing}>End Parsing</button>
        </div>
        <div className={styles.status} >
          <div className={styles.left}><b>Status:</b> {status}</div>
          <div className={styles.right}>
            <b>Rollcount:</b> {rolls.length}{timeString}
          </div>
        </div>
        <RollList rolls={rolls} detectedPhrase={detectedPhrase} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    parsing: state.parser.parsing,
    validSettings: state.settings.logFile.length > 0,
    rolls: state.parser.rolls,
    status: state.parser.status,
    timerActive: state.timer.active,
    timerStartTime: state.timer.startTime,
    timeLimit: parseInt(state.settings.timeLimit, 10),
    startingPhrase: state.settings.startingPhrase,
    detectedPhrase: state.parser.detectedPhrase,
    playSound: state.settings.playSound
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ParserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Parser); // eslint-disable-line

