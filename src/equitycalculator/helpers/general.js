import { getSuitFromUnicode } from '../'

export const getCardStringFromObj = (card) => {
    return card.rank + getSuitFromUnicode(card.suit)
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
