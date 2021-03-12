// import * as invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';

import createReducer from './createReducer';

export function injectReducerFactory(store, isVaild) {
  return function injectReducer(key, reducer) {
    // invariant(
    //   isString(key) && !isEmpty(key) && isFunction(reducer),
    //   'injectReducer: Expected `reducer` to be a reducer function',
    // );

    if (isString(key) && !isEmpty(key) && isFunction(reducer)) {
      console.log('injectReducer: Expected `reducer` to be a reducer function')
    }

    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) { return; }

    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store) {
  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
