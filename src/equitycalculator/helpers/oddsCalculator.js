import * as handRanks from '../constants/handRanks'
import { ranks, generateBoard, handRankings } from '../'
import { getCardStringFromObj } from './'

export const getHandEquity = (hands) => {
    let handOneWins = 0
    let handTwoWins = 0

    for (let i = 0; i < 100; i++) {
        const board = generateBoard()

        const handOneCards = getCards(hands[1], board)
        const handTwoCards = getCards(hands[2], board)

        const handOneRank = evaluateHandStrength(handOneCards)
        const handTwoRank = evaluateHandStrength(handTwoCards)

        if (handRankings.indexOf(handOneRank) > handRankings.indexOf(handTwoRank)) {
            handOneWins++
        } else if (handRankings.indexOf(handOneRank) < handRankings.indexOf(handTwoRank)) {
            handTwoWins++
        } else {
            const tieWinner = breakTies(handOneCards, handTwoCards, handOneRank)

            if (tieWinner === 1) {
                handOneWins++
            }

            if (tieWinner === 2) {
                handTwoWins++
            }
        }
    }

    const ties = 100 - handOneWins - handTwoWins
    const handOneEquity = getEquity(handTwoWins, ties)
    const handTwoEquity = getEquity(handOneWins, ties)

    return [handOneEquity, handTwoEquity]
}

const getEquity = (wins, ties) => (1 - (wins / 100) - (0.5 * (ties / 100))).toFixed(2)

const getCards = (hand, board) => {
    let handArray = []

    Object.entries(hand).map((card) =>
        handArray.push(getCardStringFromObj(card[1]))
    )

    return board.concat(handArray)
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

    switch (pairCount) {
        case 2:
            return handRanks.TWO_PAIR
        case 1:
            return handRanks.PAIR
        default:
            return handRanks.HIGH_CARD
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

const getRank = (handOneRank, handTwoRank) => {
    if (ranks.indexOf(handOneRank) < ranks.indexOf(handTwoRank)) {
        return 1
    } else if (ranks.indexOf(handOneRank) > ranks.indexOf(handTwoRank)) {
        return 2
    }
    return 0
}

export const breakTies = (handOne, handTwo, handRank) => {
    const handOneRanks = getRanks(handOne)
    const handTwoRanks = getRanks(handTwo)

    switch (handRank) {
        //case handRanks.STRAIGHT_FLUSH:
        //case handRanks.QUADS:
        case handRanks.PAIR:
            const pairOneIndex = getPairIndex(handOneRanks)
            const pairTwoIndex = getPairIndex(handTwoRanks)

            return getRank(handOneRanks[pairOneIndex], handTwoRanks[pairTwoIndex])
        case handRanks.HIGH_CARD:
            for (let i = 0; i < handOne.length; i++) {
                if (handOneRanks[i] === handTwoRanks[i]) {
                    continue
                }
                return getRank(handOneRanks[i], handTwoRanks[i])
            }
            return 0
        default:
            return 0
    }
}
