function counterReducer(state = { counter: 0, list: [] }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, counter: state.counter + 1 }
    case 'counter/decremented':
      return { ...state, counter: state.counter - 1 }
    case 'user/list':
      return { ...state, list: action.payload }
    default:
      return state
  }
}

export default  counterReducer