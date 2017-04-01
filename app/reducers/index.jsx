import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  snakes: require('./snakes').default,
  device: require('./device').default,
  users: require('./users').default,
})

export default rootReducer
