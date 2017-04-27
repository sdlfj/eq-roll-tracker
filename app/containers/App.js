// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import {remote} from 'electron';
const {BrowserWindow} = remote;

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
