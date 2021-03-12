import { createStore } from 'redux';
import createReducer from './createReducer';

export default function storeFactory(initialState = {}) {

  const store = createStore(
    createReducer(),
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  store.injectedReducers = {}; // Reducer registry

  return store;
}
