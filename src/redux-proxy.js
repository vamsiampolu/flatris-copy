import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import logger from 'redux-logger'
import createReduxProxy from 'react-cosmos-redux-proxy'
import initLayout, { layoutReducer } from 'react-redux-layout'
import computeLayout from '../src/layout'

// just passing through, no data was harmed by this reducer
const gameReducer = (state, action) => {
  console.log(action)
  return state
}

const rootReducer = combineReducers({
  game: gameReducer,
  layout: layoutReducer
})

let _destroyLayout

export default () => {
  return createReduxProxy({
    createStore: initialState => {
      if (_destroyLayout) {
        _destroyLayout()
      }
      const store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger))
      _destroyLayout = initLayout({ store, computeLayout })
      return store
    }
  })
}
