import { combineReducers } from 'redux'

import userReducers from './userReducers'
import restaurantReducers from './restaurantReducers'

export default combineReducers({
  restaurantReducers,
  userReducers
})
