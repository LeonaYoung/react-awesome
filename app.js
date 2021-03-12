import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Index from './src/app/index'
import storeFactory from './storeFactory';

const initialState = {};
const store = storeFactory(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
);
