import * as types from './types'

export function selectCard(rank, suit) {
    return {
        type: types.SELECT_CARD,
        rank: rank,
        suit: suit
    }
}

export function selectPosition(hand, card) {
    return {
        type: types.SELECT_POSITION,
        hand: hand,
        card: card
    }
}

export function saveEquity(hands, board, equities) {
    return {
        type: types.SAVE_EQUITY,
        hands: hands,
        board: board,
        equities: equities
    }
}

export function clearHands() {
    return {
        type: types.CLEAR_HANDS
    }
}

export function incrementHands() {
    return {
        type: types.INCREMENT_HANDS
    }
}

export function decrementHands() {
    return {
        type: types.DECREMENT_HANDS
    }
}

export function addToRange(number, hand) {
    return {
        type: types.ADD_TO_RANGE,
        number: number,
        hand: hand
    }
}

export function removeFromRange(number, hand) {
    return {
        type: types.REMOVE_FROM_RANGE,
        number: number,
        hand: hand
    }
}
