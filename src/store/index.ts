import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import globalReducer  from './reducers/global.reducer'
const reducers = combineReducers({ 
    globalReducer
})
export default createStore(reducers,compose(
    applyMiddleware(thunk),
    (f:Function)=>f
))