// #flow
import React, { Component } from 'react';
import type { rollType } from '../reducers/parser';
import styles from './RollList.css';

class RollList extends Component {
  props: {
    rolls: Array<rollType>
  };

  render() {
    const { rolls } = this.props;

    const rollElements = rolls.map((roll) => {
      return (<li key={roll.playerName}>{roll.playerName} {roll.rollValue}</li>);
    });

    return (
      <ul className={styles.rollList}>
        { rollElements }
      </ul>
    );
  }
}

export default RollList;
