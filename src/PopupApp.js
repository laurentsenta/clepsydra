/* global chrome */
import React, { Component } from 'react';

import './PopupApp.css';

const NEW_TAB = 'chrome://newtab'

class PopupApp extends Component {
  componentWillMount() {
    window.addEventListener('click', (e) => {
      if (e.target.href !== undefined) {
        chrome.tabs.create({ url: e.target.href })
      }
    })
  }

  reset() {
    chrome.storage.sync.clear(() => {
      chrome.tabs.create({ url: NEW_TAB })
    })
  }

  render() {
    return (
      <div className="PopupApp">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
        </header>
        <p className="App-intro">
          This is the Pop Up Page
        </p>
        <div>
          <button onClick={() => this.reset()}>
            RESET
          </button>
        </div>
        <a href="chrome://newtab">Boom</a>
      </div>
    );
  }
}

export default PopupApp;
