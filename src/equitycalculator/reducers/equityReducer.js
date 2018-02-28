import {
    SELECT_CARD,
    SELECT_POSITION,
    SAVE_EQUITY,
    CLEAR_HANDS,
    HAND_ONE,
    HAND_TWO,
    BOARD
} from '../'

const card = {
    rank: '',
    suit: ''
}

const initialHand = {
    1: card,
    2: card
}

const initialBoard = {
    1: card,
    2: card,
    3: card,
    4: card,
    5: card
}

const initialState = {
    slots: {
        [HAND_ONE]: initialHand,
        [HAND_TWO]: initialHand,
        [BOARD]: initialBoard
    },
    selectedPosition: HAND_ONE,
    selectedCard: 1,
    savedEquities: [
        {
            equities: [],
            hands: {
                1: initialHand,
                2: initialHand
            }
        }
    ]
}

export function equityReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_CARD:
            let selectedCard = state.selectedCard === 1 ? 2 : 1
            let selectedPosition = state.selectedPosition

            if (selectedCard === 1) {
                selectedPosition = state.selectedPosition === HAND_ONE ? HAND_TWO : HAND_ONE
            }

            return {
                ...state,
                slots: {
                    ...state.slots,
                    [state.selectedPosition]: {
                        ...state.slots[state.selectedPosition],
                        [state.selectedCard]: {
                            rank: action.rank,
                            suit: action.suit
                        }
                    }
                },
                selectedPosition: selectedPosition,
                selectedCard: selectedCard
            }
        case SELECT_POSITION:
            return {
                ...state,
                selectedPosition: action.hand,
                selectedCard: action.card
            }
        case SAVE_EQUITY:
            const savedEquities = state.savedEquities.slice()
            const equity = {
                equities: action.equities,
                hands: action.hands
            }
            savedEquities.push(equity)

            return {
                ...state,
                savedEquities
            }
        case CLEAR_HANDS:
            const equities = state.savedEquities

            return {
                ...initialState,
                savedEquities: equities
            }
        default:
            return state
    }
}
