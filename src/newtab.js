import React from 'react';
import ReactDOM from 'react-dom';
import NewtabApp from './newtab/NewtabApp';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './newtab/reducers'

let store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <NewtabApp/>
  </Provider>,
  document.getElementById('root')
)
