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
