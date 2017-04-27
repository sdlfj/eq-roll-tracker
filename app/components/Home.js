// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import Settings from './Settings';
import Parser from './Parser';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Settings />
        <Parser />
      </div>
    );
  }
}
