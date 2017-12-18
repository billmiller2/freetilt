import { combineReducers } from 'redux'

function index(state = {}, action) {
    switch (action.type) {
        default:
            return state
    }
}

export const tiltApp = combineReducers({
    index
})
