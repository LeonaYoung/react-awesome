import { USER_LIST } from './constants';

function reducer(state = { list: [] }, action) {
  switch (action.type) {
    case `${USER_LIST}`:
      return { ...state, list: action.payload }
    default:
      return state
  }
}

export default  reducer