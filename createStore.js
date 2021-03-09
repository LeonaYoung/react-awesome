import { createStore, combineReducers } from 'redux'
import userManage from './src/userManage/reducer'

let store = createStore(
  combineReducers({
    userManage,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
