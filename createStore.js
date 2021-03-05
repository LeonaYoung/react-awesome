import { createStore, combineReducers } from 'redux'
import counterReducer from './src/userManage/reducer'
import productReducer from './src/productManage/reducer'

let store = createStore(
  combineReducers({
    counterReducer,
    productReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
