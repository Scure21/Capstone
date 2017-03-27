import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  snakes: require('./snakes').default
})

export default rootReducer
