import {
    SELECT_CARD,
    SELECT_POSITION,
    SAVE_EQUITY,
    CLEAR_HANDS,
    INCREMENT_HANDS,
    DECREMENT_HANDS,
    BOARD,
    ADD_TO_RANGE,
    REMOVE_FROM_RANGE
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
        1: initialHand,
        2: initialHand,
        [BOARD]: initialBoard
    },
    ranges: {
        1: [],
        2: []
    },
    handCount: 2,
    selectedPosition: 1,
    selectedCard: 1,
    savedEquities: [
        {
            equities: [],
            hands: {
                1: initialHand,
                2: initialHand
            },
            board: initialBoard
        }
    ]
}

export function equityReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_CARD:
            let selectedCard = state.selectedCard
            let selectedPosition = state.selectedPosition

            switch (state.selectedPosition) {
                case BOARD:
                    if (selectedCard < 5) {
                        selectedCard++
                    } else {
                        selectedCard = 1
                        selectedPosition = 1
                    }
                    break;
                default:
                    if (selectedCard === 1) {
                        selectedCard = 2
                    } else {
                        selectedCard = 1
                        selectedPosition = state.selectedPosition === state.handCount
                            ? BOARD
                            : state.selectedPosition + 1
                    }
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
                hands: action.hands,
                board: action.board
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
        case INCREMENT_HANDS:
            const increasedCount = state.handCount + 1
            const increasedSlots = { ...state.slots, [increasedCount]: initialHand }
            const increasedRanges = { ...state.ranges, [increasedCount]: [] }

            return {
                ...state,
                handCount: increasedCount,
                slots: increasedSlots,
                ranges: increasedRanges
            }
        case DECREMENT_HANDS:
            const decreasedSlots = { ...state.slots }
            const decreasedRanges = { ...state.ranges }
            delete decreasedSlots[state.handCount]
            delete decreasedRanges[state.handCount]

            return {
                ...state,
                handCount: state.handCount - 1,
                slots: decreasedSlots,
                ranges: decreasedRanges
            }
        case ADD_TO_RANGE:
            let addRange = state.ranges[action.number].slice()
            addRange.push(action.hand)

            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    [action.number]: addRange
                }
            }
        case REMOVE_FROM_RANGE:
            let removeRange = state.ranges[action.number].slice()
            removeRange.splice(removeRange.indexOf(action.hand), 1)

            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    [action.number]: removeRange
                }
            }
        default:
            return state
    }
}
