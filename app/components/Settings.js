// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SettingsActions from '../actions/settings';
import { remote } from 'electron';
import styles from './Settings.css';
const { BrowserWindow } = remote;

class Settings extends Component {
  props: {
    logFile: string,
    startingPhrase: string,
    setStartingPhrase: (string) => void,
    setLogFile: (string) => void,
    setRollLimit: (number) => void,
  };

  chooseLogFile() {
    const { dispatch, setLogFile } = this.props;
    remote.dialog.showOpenDialog(BrowserWindow.getFocusedWindow(),
      { title: 'Choose Log File', properties: ['openFile']},
      (files) => setLogFile(files[0])
    );
  }


  handleStartingPhraseChange(e) {
    const { setStartingPhrase } = this.props;
    setStartingPhrase(e.target.value);
  }

  handleLogFileChange(e) {
    const { setLogFile } = this.props;
    setLogFile(e.target.value);
  }

  handleRollLimitChange(e) {
    const { setRollLimit } = this.props;
    const val = parseInt(e.target.value);
    if(!isNaN(val)) {
      setRollLimit(val);
    }
  }

  render() {
    const { logFile, startingPhrase, rollLimit, parsing } = this.props;

    return (
      <div>
        <div>Log File:<br /><input disabled={parsing} className={styles.input} type="text" value={logFile} onChange={::this.handleLogFileChange} /><button disabled={parsing} onClick={::this.chooseLogFile}>Browse</button></div>
        <div>Starting Phrase (or regex):<br /><input disabled={parsing} className={styles.input} type="text" value={startingPhrase} onChange={::this.handleStartingPhraseChange} /></div>
        <div>Roll Limit:<br /><input type="number" disabled={parsing} className={styles.input} type="text" value={rollLimit} onChange={::this.handleRollLimitChange} /></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    logFile: state.settings.logFile,
    startingPhrase: state.settings.startingPhrase,
    rollLimit: state.settings.rollLimit,
    parsing: state.parser.parsing
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
