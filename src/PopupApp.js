import React, { Component } from 'react';
import logo from './logo.svg';
import './PopupApp.css';

class PopupApp extends Component {
  render() {
    return (
      <div className="PopupApp">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
        </header>
        <p className="App-intro">
          This is the Pop Up Page
        </p>
      </div>
    );
  }
}

export default PopupApp;
