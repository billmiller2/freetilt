import * as handRanks from '../constants/handRanks'
import { ranks } from '../'
import { generateBoard, getCardStringFromObj } from './'

/**
 * Get hand rank
 *
 * Takes a hand and combines it with a board to determine best
 * possible hand
 *
 * @param {object} handObj
 * The hand object as it appears in the redux store
 * Keep in mind that the suit strings are unicode strings
 * Structure {
 *     1: { rank: 'T', suit: 'S' } // card 1
 *     2: { rank: '2', suit: 'H' } // card 2
 * }
 *
 * @param {array} board  array of up to five card strings
 * @return {string} hand rank
 */
export const getHandRank = (handObj, board = generateBoard()) => {
    //let hand = []

    //Object.entries(handObj).map((card) => {
        //hand.push(getCardStringFromObj(card[1]))
    //})

    //let cards = board.concat(hand)

    //return evaluateHandStrength(cards) // future use, for now use board
    board = ['7H', 'AH', 'AS', '5S', 'AH', '5H', '2D']
    return evaluateHandStrength(board)
}

/**
 * Evaluate hand strength
 *
 * @param {array} cards ['JD', '8C', '2H', ...]
 */
const evaluateHandStrength = (cards) => {
    cards.sort((a, b) => {
        return ranks.indexOf(a[0]) - ranks.indexOf(b[0])
    })

    let cardRanks = getRanks(cards)

    if (isStraightFlush(cards)) {
        //todo
        //return handRanks.STRAIGHT_FLUSH
    }

    if (isQuads(cardRanks)) {
        return handRanks.QUADS
    }

    if (isSet(cardRanks)) {
        return handRanks.SET
    }

    const pairCount = checkPairs(cardRanks)

    if (pairCount > 0) {
        switch (pairCount) {
            case 2:
                return handRanks.TWO_PAIR
            case 1:
                return handRanks.PAIR
            default:
                return ''
        }
    }
}

const isStraightFlush = (cards) => {
    //console.log(cards)

}

/**
 * Check if a hand has four of a kind
 *
 * @param {array} ranks ['T', '7', '2', ...]
 * @return {bool}
 */
const isQuads = (ranks) => {
    for (let i = 0; i < ranks.length - 2; i++) {
        if (ranks.indexOf(ranks[i], i + 1) > 0
            && ranks.indexOf(ranks[i], i + 2) > 0
            && ranks.indexOf(ranks[i], i + 3) > 0
        ) {
            return true
        }
    }
    return false
}

/**
 * Check if a hand has three of a kind
 *
 * @param {array} ranks ['T', '7', '2', ...]
 * @return {bool}
 */
const isSet = (ranks) => {
    for (let i = 0; i < ranks.length - 2; i++) {
        if (ranks.indexOf(ranks[i], i + 1) > 0 && ranks.indexOf(ranks[i], i + 2) > 0) {
            return true
        }
    }
    return false
}

/**
 * Check for pairs
 *
 * @param {array} ranks ['T', '7', '2', ...]
 * @return {integer} pair count
 */
const checkPairs = (ranks) => {
    let pairCount = 0

    for (let i = 0; i < ranks.length - 1; i++) {
        let index = getPairIndex(ranks.slice(i))

        if (index >= 0) {
            pairCount++

            if (pairCount === 2) {
                return pairCount
            }

            ranks.splice(index, 2)
        }
    }

    return pairCount
}

/**
 * Get pair index
 *
 * @param array ranks ['K', 'T', '7', ...]
 * @return {integer} index of first pair card
 */
const getPairIndex = (ranks) => {
    for (let i = 0; i < ranks.length - 1; i++) {
        if (ranks.indexOf(ranks[i], i + 1) > 0) {
            return i
        }
    }
    return -1
}

/**
 * Get array of ranks from array of cards
 * Useful for calculating suit ignorant hands
 *
 * @param {array} cards ['AH', 'KS', '2D', ...]
 * @return {array} ranks ['A', 'K', '2', ...]
 */
const getRanks = (cards) => {
    let ranks = []
    for (let i = 0; i < cards.length; i++) {
        ranks.push(cards[i][0])
    }
    return ranks
}
