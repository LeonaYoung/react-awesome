function counterReducer(state = { list: [] }, action) {
  switch (action.type) {
    case 'product/list':
      return { ...state, list: action.payload }
    default:
      return state
  }
}

export default  counterReducer