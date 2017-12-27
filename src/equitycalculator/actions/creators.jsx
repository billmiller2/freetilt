import * as types from './types'

export function selectCard(rank, suit) {
    return {
        type: types.SELECT_CARD,
        rank: rank,
        suit: suit
    }
}
