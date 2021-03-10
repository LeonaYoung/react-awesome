import { createStore, combineReducers } from 'redux'
import userManage from './src/UserManage/reducer'

const reducers = {
  userManage,
}

let store = createStore(
  combineReducers(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
