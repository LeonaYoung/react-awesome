function counterReducer(state = { counter: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { counter: state.counter + 1 }
    case 'counter/decremented':
      return { counter: state.counter - 1 }
    default:
      return state
  }
}

export default  counterReducer