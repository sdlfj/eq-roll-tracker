// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ParserActions from '../actions/parser';
import styles from './Parser.css';
import RollList from './RollList';
import type { rollType } from '../reducers/parser';

class Parser extends Component {
  props: {
    beginParsing: () => void,
    endParsing: () => void,
    parsing: boolean,
    rolls: Array<rollType>,
    validSettings: boolean,
    reset: () => void,
    status: string
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
      reset
    } = this.props;
    return (
      <div className={styles.parser}>
        <div className={styles.menu}>
          <button disabled={parsing || !validSettings} onClick={beginParsing}>Begin Parsing</button>
          <button onClick={reset}>Reset</button>
          <button disabled={!parsing} onClick={endParsing}>End Parsing</button>
        </div>
        <div className={styles.status} >
          <div className={styles.left}>Status: {status}</div>
          <div className={styles.right}># of Rolls: {rolls.length}</div>
        </div>
        <RollList rolls={rolls} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    parsing: state.parser.parsing,
    validSettings: state.settings.logFile.length > 0,
    rolls: state.parser.rolls,
    status: state.parser.status
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ParserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Parser); // eslint-disable-line

