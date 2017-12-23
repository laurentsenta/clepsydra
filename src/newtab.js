import React from 'react';
import ReactDOM from 'react-dom';
import App from './newtab/App';

import { Provider } from 'react-redux'
import store from './newtab/store'


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
