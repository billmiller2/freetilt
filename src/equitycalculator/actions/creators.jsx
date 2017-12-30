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
