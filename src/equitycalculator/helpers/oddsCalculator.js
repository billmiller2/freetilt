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
    board = ['AH', '2H', '3H', '4H', '5H', '9H', '2D']
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
    let cardSuits = getSuits(cards)

    if (isStraightFlush(cards)) {
        return handRanks.STRAIGHT_FLUSH
    }

    if (isQuads(cardRanks)) {
        return handRanks.QUADS
    }

    if (isBoat(cardRanks)) {
        return handRanks.BOAT
    }

    if (isFlush(cardSuits)) {
        return handRanks.FLUSH
    }

    if (isStraight(cardRanks)) {
        return handRanks.STRAIGHT
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

/**
 * Check for straight flush
 *
 * @param {array} cards ['AH', 'KS', '2D', ...]
 * @return {bool}
 */
const isStraightFlush = (cards) => {
    const cardSuits = getSuits(cards)
    const flush = isFlush(cardSuits, true)

    if (flush) {
        const flushCards = cards.filter((card) => card[1] === flush)
        const flushRanks = getRanks(flushCards)

        if (isStraight(flushRanks)) {
            return true
        }
    }
    return false
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
 * Check for full house
 *
 * @param {array} ranks ['T', '7', '2', ...]
 * @return {bool}
 */
const isBoat = (cardRanks) => {
    let setIdx = -1
    for (let i = 0; i < cardRanks.length - 2; i++) {
        if (cardRanks.indexOf(cardRanks[i], i + 1) > 0 && cardRanks.indexOf(cardRanks[i], i + 2) > 0) {
            setIdx = i
        }
    }

    if (setIdx > -1) {
        cardRanks.splice(setIdx, 3)

        let pairs = checkPairs(cardRanks)

        if (pairs > 0) {
            return true
        }
    }
    return false
}

/**
 * Check for flush
 *
 * @param {array} cardSuits ['H', 'D', 'C', ...]
 * @return {bool}
 */
const isFlush = (cardSuits, getSuit = false) => {
    let checkedSuits = []

    for (let i = 0; i < cardSuits.length - 4; i++) {
        let count = 1

        if (checkedSuits.indexOf(cardSuits[i]) === -1) {
            for (let j = i + 1; j < cardSuits.length; j++) {
                if (cardSuits[j] === cardSuits[i]) {
                    count++

                    if (count === 5) {
                        return getSuit ? cardSuits[i] : true
                    }
                }
                checkedSuits.push(cardSuits[i])
            }
        }
    }
    return false
}

/**
 * Check for straight
 *
 * @param {array} ranks ['T', '7', '2', ...]
 * @return {bool}
 */
const isStraight = (cardRanks) => {
    const uniqueRanks = cardRanks.filter((rank, idx, array) => array.indexOf(rank) === idx)

    if (uniqueRanks.length > 4) {
        for (let i = 0; i < uniqueRanks.length - 4; i++) {
            // check for wheel straight
            if (uniqueRanks[i] === 'A'
                && uniqueRanks.indexOf('5') > 0
                && uniqueRanks.indexOf('4') > 0
                && uniqueRanks.indexOf('3') > 0
                && uniqueRanks.indexOf('2') > 0
            ) {
                return true
            }

            const idx = ranks.indexOf(uniqueRanks[i])

            if (ranks.slice(idx, idx + 5).toString() === uniqueRanks.slice(i, i + 5).toString()) {
                return true
            }
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

/**
 * Get array of suits from array of cards
 * Useful for calculating rank ignorant hands
 *
 * @param {array} cards ['AH', 'KS', '2D', ...]
 * @return {array} ranks ['H', 'S', 'D', ...]
 */
const getSuits = (cards) => {
    let suits = []
    for (let i = 0; i < cards.length; i++) {
        suits.push(cards[i][1])
    }
    return suits
}
