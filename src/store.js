import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

const logger = createLogger()
const initialState = {}

export default createStore(reducer, initialState, applyMiddleware(logger))
