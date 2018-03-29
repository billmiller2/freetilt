import * as handRanks from '../constants/handRanks'
import { ranks, handRankings } from '../'
import { getCardStringFromObj, generateBoard } from './'

export const getHandEquity = (hands, board) => {
    let handOneWins = 0
    let handTwoWins = 0

    if (getCards(hands[1]).indexOf('') !== -1
        || getCards(hands[2]).indexOf('') !== -1
    ) {
        return []
    }

    let boardCards = []
    for (let j = 1; j < 6; j++) {
        boardCards.push(getCardStringFromObj(board[j]))
    }

    for (let i = 0; i < 10000; i++) {
        const fullBoard = generateBoard(getCards(hands[1]), getCards(hands[2]), boardCards)

        const handOneCards = getCards(hands[1], fullBoard)
        const handTwoCards = getCards(hands[2], fullBoard)

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

    const ties = 10000 - handOneWins - handTwoWins
    const handOneEquity = getEquity(handTwoWins, ties)
    const handTwoEquity = getEquity(handOneWins, ties)

    return [handOneEquity, handTwoEquity]
}

const getEquity = (wins, ties) => (1 - (wins / 10000) - (0.5 * (ties / 10000))).toFixed(2)

const getCards = (hand, board = []) => {
    let handArray = []

    Object.entries(hand).map((card) =>
        handArray.push(getCardStringFromObj(card[1]))
    )

    return board.length > 0 ? board.concat(handArray) : handArray
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
        const ranksSplice = cardRanks.slice()
        ranksSplice.splice(setIdx, 3)

        let pairs = checkPairs(ranksSplice)

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
 * @return {bool} || {int}
 */
const isStraight = (cardRanks, returnIdx = false) => {
    const uniqueRanks = cardRanks.filter((rank, idx, array) => array.indexOf(rank) === idx)

    if (uniqueRanks.length > 4) {
        for (let i = 0; i < uniqueRanks.length - 4; i++) {
            const idx = ranks.indexOf(uniqueRanks[i])

            if (ranks.slice(idx, idx + 5).toString() === uniqueRanks.slice(i, i + 5).toString()) {
                return returnIdx ? cardRanks.indexOf(uniqueRanks[i]) : true
            }

            // check for wheel straight
            if (uniqueRanks[i] === 'A'
                && uniqueRanks.indexOf('5') > 0
                && uniqueRanks.indexOf('4') > 0
                && uniqueRanks.indexOf('3') > 0
                && uniqueRanks.indexOf('2') > 0
            ) {
                return returnIdx ? cardRanks.indexOf('5') : true
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
    let ranksSlice = ranks.slice()

    for (let i = 0; i < ranksSlice.length - 1; i++) {
        let index = getPairIndex(ranksSlice.slice(i))

        if (index >= 0) {
            pairCount++

            if (pairCount === 2) {
                return pairCount
            }

            ranksSlice.splice(index, 2)
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

const checkKicker = (handOneRanks, handTwoRanks) => {
    for (let i = 0; i < 5; i++) {
        if (handOneRanks[i] === handTwoRanks[i]) {
            continue
        }
        return getRank(handOneRanks[i], handTwoRanks[i])
    }
    return 0
}

export const breakTies = (handOne, handTwo, handRank) => {
    const handOneRanks = getRanks(handOne)
    const handTwoRanks = getRanks(handTwo)

    switch (handRank) {
        case handRanks.FLUSH:
            let suits = getSuits(handOne)
            let suit = ''

            for (let i = 0; i < suits.length; i++) {
                let idx = suits.indexOf(suits[i], i + 1)

                if (idx > -1) {
                    let suitsSlice = suits.slice()
                    suitsSlice.splice(idx, 1)

                    if (suitsSlice.indexOf(suits[i], i + 1)) {
                        suit = suits[i]
                        break
                    }
                }
            }

            const flushOne = handOne.filter((card) => card[1] === suit)
            const flushTwo = handTwo.filter((card) => card[1] === suit)

            let winner = 0
            for (let j = 0; j < 5; j++) {
                if (typeof flushOne[j] !== 'undefined' && typeof flushTwo[j] !== 'undefined') {
                    winner = getRank(flushOne[j][0], flushTwo[j][0])
                }

                if (winner > 0) {
                    break
                }
            }

            return winner
        case handRanks.STRAIGHT:
            const handOneIdx = isStraight(handOneRanks, true)
            const handTwoIdx = isStraight(handTwoRanks, true)

            return getRank(handOneRanks[handOneIdx], handTwoRanks[handTwoIdx])
        case handRanks.TWO_PAIR:
            const handOnePairOneIdx = getPairIndex(handOneRanks)
            const handTwoPairOneIdx = getPairIndex(handTwoRanks)
            const pairOneCompare = getRank(handOneRanks[handOnePairOneIdx], handTwoRanks[handTwoPairOneIdx])

            if (pairOneCompare > 0) {
                return pairOneCompare
            }

            handOneRanks.splice(handOnePairOneIdx, 2)
            handTwoRanks.splice(handTwoPairOneIdx, 2)

            const handOnePairTwoIdx = getPairIndex(handOneRanks)
            const handTwoPairTwoIdx = getPairIndex(handTwoRanks)
            const pairTwoCompare = getRank(handOneRanks[handOnePairTwoIdx], handTwoRanks[handTwoPairTwoIdx])

            if (pairTwoCompare > 0) {
                return pairTwoCompare
            }

            handOneRanks.splice(handOnePairTwoIdx, 2)
            handTwoRanks.splice(handTwoPairTwoIdx, 2)

            return getRank(handOneRanks[0], handTwoRanks[0])
        case handRanks.QUADS:
        case handRanks.SET:
        case handRanks.PAIR:
            const idxOne = getPairIndex(handOneRanks)
            const idxTwo = getPairIndex(handTwoRanks)
            const bestPair = getRank(handOneRanks[idxOne], handTwoRanks[idxTwo])

            if (bestPair > 0) {
                return bestPair
            }
            return checkKicker(handOneRanks, handTwoRanks)
        case handRanks.HIGH_CARD:
            return checkKicker(handOneRanks, handTwoRanks)
        default:
            return 0
    }
}
