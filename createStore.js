import { createStore } from 'redux'
import counterReducer from './src/userManage/reducer'

let store = createStore(counterReducer)

export default store;
