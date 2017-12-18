import { combineReducers } from 'redux'
import { equityReducer } from './equitycalculator'

export const tiltApp = combineReducers({
    equityReducer
})
