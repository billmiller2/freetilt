import React from 'react'
import {
    getSuitFromUnicode,
    getSuitFromHTML,
    ranks,
    unicodeSuits
} from '../'

export const getCardStringFromObj = (card) => {
    return card.rank + getSuitFromUnicode(card.suit)
}

export const getHandsFromRangeHand = (rangeHand) => {
    let hands = []

    if (rangeHand.indexOf('s') !== -1) { // suited
        unicodeSuits.forEach(suit => {
            hands.push({
                1: {
                    rank: rangeHand[0],
                    suit: suit
                },
                2: {
                    rank: rangeHand[1],
                    suit: suit
                }
            })
        })
    } else if (rangeHand.indexOf('o') !== -1 ) { // offsuit
        unicodeSuits.forEach(suitOne => {
            unicodeSuits.forEach(suitTwo => {
                if (suitOne !== suitTwo) {
                    hands.push({
                        1: {
                            rank: rangeHand[0],
                            suit: suitOne
                        },
                        2: {
                            rank: rangeHand[1],
                            suit: suitTwo
                        }
                    })
                }
            })
        })
    } else { // pair
        unicodeSuits.forEach((suitOne, i) => {
            unicodeSuits.forEach((suitTwo, j) => {
                if (suitOne !== suitTwo && j > i) {
                    hands.push({
                        1: {
                            rank: rangeHand[0],
                            suit: suitOne
                        },
                        2: {
                            rank: rangeHand[1],
                            suit: suitTwo
                        }
                    })
                }
            })
        })
    }

    return hands
}

export const getHandsFromSlots = (slots) => {
    const handCount = Object.keys(slots).length
    let hands = {}

    for (let i = 1; i < handCount; i++) {
        hands[i] = slots[i]
    }

    return hands
}

export const formatPercentage = (number, decimalPlaces) => {
    if (number > 0.99 && number !== 1) {
        return '>99%'
    }
    if (number < 0.01 && number !== 0) {
        return '<1%'
    }
    return (number * 100).toFixed(decimalPlaces) + '%'
}

export const getHand = (hand) => {
    let formattedHand = []

    Object.values(hand).forEach((card, i) => {
        const suit = getSuitFromHTML(card.suit.charCodeAt())
        formattedHand.push(
            <span key={i} className={suit}>
                {card.rank + card.suit}
            </span>
        )
    })

    return formattedHand
}

const getPairSummary = (pairs) => {
    const sortedPairs = pairs.sort((a, b) => ranks.indexOf(a[0]) - ranks.indexOf(b[0]))
    let pairRanges = [{
        highest: '',
        lowest: ''
    }]

    sortedPairs.forEach((pair, i) => {
        const currentRange = pairRanges.length - 1

        if (pairRanges[currentRange].highest.length === 0) {
            pairRanges[currentRange].highest = pair
        }

        if ((i + 1) === sortedPairs.length) {
            pairRanges[currentRange].lowest = pair
        } else if (ranks.indexOf(sortedPairs[i + 1][0]) - ranks.indexOf(sortedPairs[i][0]) !== 1) {
            pairRanges[currentRange].lowest = pair
            pairRanges.push({
                highest: '',
                lowest: ''
            })
        }
    })

    let pairSummary = ''

    pairRanges.forEach((pairRange, i) => {
        pairSummary += pairRange.highest

        if (pairRange.highest !== pairRange.lowest) {
            pairSummary += '-' + pairRange.lowest
        }
        if (pairRanges.length === 1 && sortedPairs.indexOf('AA') !== -1 && sortedPairs.length > 1) {
            pairSummary = pairRange.lowest + '+'
        }
        if ((i + 1) < pairRanges.length) {
            pairSummary += ', '
        }
    })

    return pairSummary
}

const getNonPairSummary = (nonPairs, pairs, rangeSummary) => {
    nonPairs.forEach((hand, i) => {
        if (i === 0 && pairs.length > 0) {
            rangeSummary += ', '
        }

        if (rangeSummary.length < 45) {
            rangeSummary += hand

            if ((i + 1) < nonPairs.length) {
                rangeSummary += ', '
            }
        } else if (rangeSummary.indexOf('...') === -1) {
            rangeSummary = rangeSummary.slice(0, -2) + '...'
        }
    })
}

export const getRange = (range) => {
    const pairs = range.filter(hand => hand.length === 2)
    const nonPairs = range.filter(hand => hand.length === 3)
    let rangeSummary = getPairSummary(pairs)

    nonPairs.forEach((hand, i) => {
        if (i === 0 && pairs.length > 0) {
            rangeSummary += ', '
        }

        if (rangeSummary.length < 45) {
            rangeSummary += hand

            if ((i + 1) < nonPairs.length) {
                rangeSummary += ', '
            }
        } else if (rangeSummary.indexOf('...') === -1) {
            rangeSummary = rangeSummary.slice(0, -2) + '...'
        }
    })

    return rangeSummary
}

export const getRangeSummary = (range) => {
    let pairs = []
    let nonPairs = []

    range.forEach(hand => {
        const firstCard = hand[1].rank
        const secondCard = hand[2].rank
        const handRanks = firstCard + secondCard

        if (firstCard === secondCard && pairs.indexOf(handRanks) === -1) {
            pairs.push(handRanks)
        } else if (firstCard !== secondCard && nonPairs.indexOf(handRanks) === -1) {
            nonPairs.push(firstCard + secondCard)
        }
    })

    let rangeSummary = getPairSummary(pairs)

    return rangeSummary
}
