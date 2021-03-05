import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Index from './src/app/index'
import store from './createStore';

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
);
