/* global chrome */
import React, { Component } from 'react';

import './PopupApp.css';

const NEW_TAB = 'chrome://newtab'

class PopupApp extends Component {
  componentWillMount() {
  }

  reset() {
    chrome.storage.sync.clear(() => {
      chrome.tabs.create({ url: NEW_TAB })
    })
  }

  render() {
    return (
      <div id="popup" className="text-center">
        <header className="header">
          <h2 className="title">Clepsydra</h2>
        </header>
        <p className="intro text-muted">
          You may reset the application to change your configuration:
        </p>
        <div>
          <button className="btn btn-warning"
                  onClick={() => this.reset()}>
            RESET
          </button>
        </div>
      </div>
    );
  }
}

export default PopupApp;
