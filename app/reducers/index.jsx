import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  snakes: require('./snakes').default,
  device: require('./device').default,
  users: require('./users').default,
})

export default rootReducer
