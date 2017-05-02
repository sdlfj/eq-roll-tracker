// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { remote } from 'electron';
import * as SettingsActions from '../actions/settings';
import styles from './Settings.css';

const { BrowserWindow } = remote;

class Settings extends Component {

  /* eslint-disable */
  props: {
    logFile: string,
    startingPhrase: string,
    setStartingPhrase: (string) => void,
    setLogFile: (string) => void,
    setRollLimit: (number) => void,
    setTimeLimit: (number) => void,
    rollLimit: string | number,
    parsing: boolean,
    timeLimit?: string | number,
    autoClipboard: boolean
  };
  /* eslint-enable */

  static defaultProps = {
    timeLimit: 20
  }

  chooseLogFile() {
    const { setLogFile } = this.props;
    remote.dialog.showOpenDialog(BrowserWindow.getFocusedWindow(),
      { title: 'Choose Log File', properties: ['openFile'] },
      (files) => setLogFile(files[0])
    );
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name.charAt(0).toUpperCase() + target.name.slice(1);

    this.props[`set${name}`](value);
  }

  render() {
    const {
      logFile, startingPhrase,
      rollLimit, parsing, timeLimit,
      autoClipboard
    } = this.props;
    /* eslint-disable */
    return (
      <div>
        <div>Log File:<br /><input name="logFile" disabled={parsing} className={styles.input} type="text" value={logFile} onChange={::this.handleInputChange} /><button disabled={parsing} onClick={::this.chooseLogFile}>Browse</button></div>
        <div className={styles.limits}>
          <div>Starting Phrase (or regex):<br /><input name="startingPhrase" disabled={parsing} className={styles.input} type="text" value={startingPhrase} onChange={::this.handleInputChange} /></div>
          <div>Time Limit (seconds):<br /><input name="timeLimit" type="number" disabled={parsing} className={styles.input} value={timeLimit} onChange={::this.handleInputChange} /></div>
        </div>
        <div className={styles.limits} >
          <div>Roll Limit:<br /><input name="rollLimit" type="number" disabled={parsing} className={styles.input} value={rollLimit} onChange={::this.handleInputChange} /></div>
          <div className={styles.checkbox}><input disabled={parsing} name="autoClipboard" type="checkbox" checked={autoClipboard} onChange={::this.handleInputChange}/> Add winners to clipboard</div>
        </div>
      </div>
    );
    /* eslint-enable */
  }
}

function mapStateToProps(state) {
  return {
    logFile: state.settings.logFile,
    startingPhrase: state.settings.startingPhrase,
    rollLimit: state.settings.rollLimit,
    parsing: state.parser.parsing,
    timeLimit: state.settings.timeLimit,
    autoClipboard: state.settings.autoClipboard
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
