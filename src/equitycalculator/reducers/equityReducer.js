import { SELECT_CARD } from '../'

export function equityReducer(state = {}, action) {
    switch (action.type) {
        case SELECT_CARD:
            return state
        default:
            return state
    }
}
