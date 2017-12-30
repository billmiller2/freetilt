import { SELECT_CARD, SELECT_POSITION } from '../'

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
            let selectedCard = state.selectedCard === 1 ? 2 : 1
            let selectedHand = state.selectedHand

            if (selectedCard === 1) {
                selectedHand = state.selectedHand === 1 ? 2 : 1
            }

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
                },
                selectedHand: selectedHand,
                selectedCard: selectedCard
            }
        case SELECT_POSITION:
            return {
                ...state,
                selectedHand: action.hand,
                selectedCard: action.card
            }
        default:
            return state
    }
}
