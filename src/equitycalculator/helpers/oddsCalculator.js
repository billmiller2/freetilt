import * as handRanks from '../constants/handRanks'

export const getHandRank = (hand, board) => {
    let cards = hand.concat(board).sort()
}
