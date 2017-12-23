import React from 'react';
import ReactDOM from 'react-dom';
import NewtabApp from './newtab/NewtabApp';

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducers from './newtab/reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

let store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <NewtabApp/>
  </Provider>,
  document.getElementById('root')
)
