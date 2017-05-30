// @flow
import React, { Component } from 'react';
import type { rollType } from '../reducers/parser';
import styles from './RollList.css';

class RollList extends Component {
  props: {
    rolls: Array<rollType>,
    detectedPhrase: string
  };

  render() {
    const { rolls, detectedPhrase } = this.props;

    const rollElements = rolls.map(
      (roll) => <li key={roll.playerName}>{roll.playerName} {roll.rollValue}</li>
    );

    return (
      <ul className={styles.rollList}>
        { detectedPhrase && detectedPhrase.length > 0 &&
          <li className={styles.detectedPhrase} >{detectedPhrase}</li>
        }
        { rollElements }
      </ul>
    );
  }
}

export default RollList;
