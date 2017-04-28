// @flow
import React, { Component } from 'react';
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
