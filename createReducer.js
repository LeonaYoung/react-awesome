import { combineReducers } from 'redux';

function reducer(state = { loading: false }, action) {
  switch (action.type) {
    case 'change/loading':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export default function createReducer(injectedReducers) {
  return combineReducers({
    global: reducer,
    ...injectedReducers,
  });
}
