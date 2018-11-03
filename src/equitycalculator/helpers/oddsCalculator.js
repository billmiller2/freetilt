import * as handRanks from '../constants/handRanks'
import { ranks, handRankings } from '../'
import { getCardStringFromObj, generateBoard } from './'

/**
 * Calculate hand equities
 *
 * @param {object} hands
 *     {
 *         1: {
 *             1: {
 *                 rank: "Q",
 *                 suit: unicode suit string
 *             },
 *             2: {
 *                 rank: "J",
 *                 suit: unicode suit string
 *             }
 *         },
 *         2: same structure as hand one,
 *         n: a variable number of hands can be submitted
 *     }
 *
 * @param {object} board
 *     {
 *         1: {
 *             rank: "K",
 *             suit: unicode suit string
 *         },
 *         2, 3, 4, 5 same structure as 1
 *         Empty cards will still be passed but have empty strings for rank & suit
 *     }
 */
export const getHandEquity = (hands, board) => {
    if (!isValidInput(hands)) {
        return []
    }

    const boardCards = getBoardCards(board)
    const handCount = Object.keys(hands).length
    let { breakdowns, wins, tieEquities } = initializeEquityVariables(handCount)

    for (let i = 0; i < 10000; i++) {
        const holeCards = getHoleCards(hands, handCount)
        const fullBoard = generateBoard(holeCards, boardCards)
        const { handCards, handStrengths, updatedBreakdowns } = evaluateHands(breakdowns, handCount, hands, fullBoard)
        breakdowns = updatedBreakdowns
        const topHandRankIndex = getTopHandRankIndex(handStrengths)
        const winningIndicies = getWinningIndicies(handStrengths, topHandRankIndex)

        if (winningIndicies.length === 1) {
            wins[winningIndicies[0]]++
        } else {
            const losingIndicies = getLosingIndicies(winningIndicies, handCards, topHandRankIndex)
            const updatedWinningIndicies = winningIndicies.filter(index => losingIndicies.indexOf(index) === -1)

            if (updatedWinningIndicies.length === 1) {
                wins[updatedWinningIndicies[0]]++
            } else {
                const tieEquity = ((1 / updatedWinningIndicies.length) * (1 / 10000))

                updatedWinningIndicies.forEach(index => {
                    tieEquities[index] += tieEquity
                })
            }
        }
    }

    breakdowns.forEach((breakdown, i) => {
        Object.entries(breakdown).forEach(([key, value]) => {
            breakdowns[i][key] = value / 10000
        })
        breakdowns[i]['equity'] = getEquity(wins[i], tieEquities[i])
    })

    return breakdowns
}

const isValidInput = (hands) => {
    if (getCards(hands[1]).indexOf('') !== -1
        || getCards(hands[2]).indexOf('') !== -1
    ) {
        return false
    }
    return true
}

const getBoardCards = (board) => {
    let boardCards = []
    for (let j = 1; j < 6; j++) {
        boardCards.push(getCardStringFromObj(board[j]))
    }
    return boardCards
}

const initializeEquityVariables = (handCount) => {
    let wins = []
    let tieEquities = []
    let breakdowns = []
    for (let i = 0; i < handCount; i++) {
        wins.push(0)
        tieEquities.push(0)
        breakdowns.push({})
        for (let j = 0; j < handRankings.length; j++) {
            breakdowns[i][handRankings[j]] = 0
        }
    }

    return { breakdowns, wins, tieEquities }
}

const getHoleCards = (hands, handCount) => {
    let holeCards = []
    for (let i = 0; i < handCount; i++) {
        holeCards.push(getCards(hands[i + 1]))
    }
    return holeCards
}

const evaluateHands = (breakdowns, handCount, hands, fullBoard) => {
    let handCards = []
    let handStrengths = []
    for (let j = 0; j < handCount; j++) {
        handCards.push(getCards(hands[j + 1], fullBoard))
        handStrengths.push(evaluateHandStrength(handCards[j]))
        breakdowns[j][handStrengths[j]]++
    }

    return { handCards, handStrengths, updatedBreakdowns: breakdowns }
}

const getTopHandRankIndex = (handStrengths) => {
    let topHandRankIndex = 0
    handStrengths.forEach(handStrength => {
        if (handRankings.indexOf(handStrength) > topHandRankIndex) {
            topHandRankIndex = handRankings.indexOf(handStrength)
        }
    })

    return topHandRankIndex
}

const getWinningIndicies = (handStrengths, topHandRankIndex) => {
    let winningIndicies = []
    handStrengths.forEach((handStrength, i) => {
        if (handRankings.indexOf(handStrength) === topHandRankIndex) {
            winningIndicies.push(i)
        }
    })

    return winningIndicies
}

const getLosingIndicies = (winningIndicies, handCards, topHandRankIndex) => {
    let losingIndicies = []
    winningIndicies.forEach((outerIndex) => {
        winningIndicies.forEach((innerIndex) => {
            if (innerIndex > outerIndex) {
                const tieWinner = breakTies(
                    handCards[outerIndex],
                    handCards[innerIndex],
                    handRankings[topHandRankIndex]
                )
                switch (tieWinner) {
                    case 1:
                        if (losingIndicies.indexOf(innerIndex) === -1) {
                            losingIndicies.push(innerIndex)
                        }
                        break
                    case 2:
                        if (losingIndicies.indexOf(outerIndex) === -1) {
                            losingIndicies.push(outerIndex)
                        }
                        break
                    default:
                }
            }
        })
    })

    return losingIndicies
}

const getEquity = (wins, ties) => ((wins / 10000) + ties)

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
    const setIdx = getSetIdx(cardRanks)

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
 * Get set index
 *
 * @param {array} ranks ['T', '7', '2', ...]
 * @return {integer}
 */
const getSetIdx = (ranks) => {
    for (let i = 0; i < ranks.length - 2; i++) {
        if (ranks.indexOf(ranks[i], i + 1) > 0 && ranks.indexOf(ranks[i], i + 2) > 0) {
            return i
        }
    }
    return -1
}

/**
 * Check for pairs
 *
 * @param {array} ranks ['T', '7', '2', ...]
 * @return {integer} pair count
 */
const checkPairs = (ranks) => {
    let pairCount = 0
    let j = 0
    let ranksSlice = ranks.slice()

    for (let i = 0; i < ranksSlice.length - 1; i++) {
        let index = getPairIndex(ranksSlice.slice(i - j))

        if (index >= 0) {
            pairCount++

            if (pairCount === 2) {
                return pairCount
            }

            ranksSlice.splice(index, 2)
            j = 2
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

export const checkKicker = (handOneRanks, handTwoRanks) => {
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
        case handRanks.BOAT:
            const handOneSetIdx = getSetIdx(handOneRanks)
            const handTwoSetIdx = getSetIdx(handTwoRanks)
            const setRank = getRank(handOneRanks[handOneSetIdx], handTwoRanks[handTwoSetIdx])

            if (setRank > 0) {
                return setRank
            }

            let handOneRemaining = handOneRanks.slice()
            let handTwoRemaining = handTwoRanks.slice()

            handOneRemaining.splice(handOneSetIdx, 3)
            handTwoRemaining.splice(handTwoSetIdx, 3)

            const pairOneIdx = getPairIndex(handOneRanks)
            const pairTwoIdx = getPairIndex(handTwoRanks)

            return getRank(handOneRanks[pairOneIdx], handTwoRanks[pairTwoIdx])
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
