import { getSuitFromUnicode, unicodeSuits } from '../'

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
