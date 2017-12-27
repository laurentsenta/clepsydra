import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PopupApp from './PopupApp';
import setupGTAG from './gtag'

setupGTAG()

ReactDOM.render(<PopupApp/>, document.getElementById('root'));
