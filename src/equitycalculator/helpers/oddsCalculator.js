//import * as handRanks from '../constants/handRanks'
import { ranks } from '../'
import { generateBoard, getCardStringFromObj } from './'

export const getHandRank = (handObj, board = generateBoard()) => {
    //let hand = []

    //Object.entries(handObj).map((card) => {
        //hand.push(getCardStringFromObj(card[1]))
    //})

    //let cards = board.concat(hand)

    //return evaluateHandStrength(cards) // future use, for now use board
    return evaluateHandStrength(board)
}

const evaluateHandStrength = (cards) => {
    cards.sort((a, b) => {
        return ranks.indexOf(a[0]) - ranks.indexOf(b[0])
    })
}
