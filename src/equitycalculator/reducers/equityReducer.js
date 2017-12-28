import { SELECT_CARD } from '../'

const card = {
    rank: '',
    suit: ''
}

const initialHand = {
    1: card,
    2: card
}

const initialState = {
    hands: {
        1: initialHand,
        2: initialHand
    },
    selectedHand: 1,
    selectedCard: 1
}

export function equityReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_CARD:
            return {
                ...state,
                hands: {
                    ...state.hands,
                    [state.selectedHand]: {
                        ...state.hands[state.selectedHand],
                        [state.selectedCard]: {
                            rank: action.rank,
                            suit: action.suit
                        }
                    }
                }
            }
        default:
            return state
    }
}
