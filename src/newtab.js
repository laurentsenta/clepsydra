import React from 'react';
import ReactDOM from 'react-dom';
import NewtabApp from './newtab/NewtabApp';

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducers from './newtab/reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createForms } from 'react-redux-form';

const initialUserState = {
  firstName: '',
  lastName: ''
};

function composeRoot(root, rest) {
  return (state, action) => {
    state = root(state, action)

    Object.entries(rest)
      .forEach(([k, v]) => {
        state[k] = v(state[k], action)
      })

    return state
  }
}

const store = createStore(
  composeRoot(
    reducers,
    createForms({
      user: initialUserState,
    })
  ),
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <NewtabApp/>
  </Provider>,
  document.getElementById('root')
)
