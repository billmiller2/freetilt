//import * as handRanks from '../constants/handRanks'
import { generateBoard, getCardStringFromObj } from './'

export const getHandRank = (handObj, board = generateBoard()) => {
    let hand = []

    Object.entries(handObj).map((card) => {
        hand.push(getCardStringFromObj(card[1]))
    })

    let cards = board.concat(hand)
}
