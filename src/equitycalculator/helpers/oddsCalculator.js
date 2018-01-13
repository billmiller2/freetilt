import * as handRankings from '../constants/handRanks'
import { ranks } from '../'
import { generateBoard, getCardStringFromObj } from './'

export const getHandRank = (handObj, board = generateBoard()) => {
    //let hand = []

    //Object.entries(handObj).map((card) => {
        //hand.push(getCardStringFromObj(card[1]))
    //})

    //let cards = board.concat(hand)

    //return evaluateHandStrength(cards) // future use, for now use board
    board = ['TH', '9H', '6S', '2S', '2H', 'QH', 'KH']
    return evaluateHandStrength(board)
}

const evaluateHandStrength = (cards) => {
    cards.sort((a, b) => {
        return ranks.indexOf(a[0]) - ranks.indexOf(b[0])
    })

    let handRanks = getRanks(cards)

    if (isStraightFlush(cards)) {
        //todo
        //return handRanks.STRAIGHT_FLUSH
    }

    if (isQuads(cards)) {
        //todo
    }

    if (isPair(handRanks)) {
        return handRankings.PAIR
    }
}

const isStraightFlush = (cards) => {
    //console.log(cards)

}

const isQuads = (cards) => {
    //console.log(cards)
}

const isPair = (ranks) => {
    for (let i = 0; i < ranks.length - 1; i++) {
        if (ranks.indexOf(ranks[i], i + 1) >= 0) {
            return true
        }
    }
    return false
}

const getRanks = (cards) => {
    let ranks = []
    for (let i = 0; i < cards.length; i++) {
        ranks.push(cards[i][0])
    }
    return ranks
}
