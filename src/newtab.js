import React from 'react';
import ReactDOM from 'react-dom';
import App from './newtab/App';

import { Provider } from 'react-redux'
import store from './newtab/store'
import LocalStorageLoader from "./newtab/LocalStorage"


ReactDOM.render(
  <Provider store={store}>
    <div className="app container-fluid">
      <LocalStorageLoader>
        <App/>
      </LocalStorageLoader>
    </div>
  </Provider>,
  document.getElementById('root')
)
