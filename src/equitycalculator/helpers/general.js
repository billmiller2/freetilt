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

export const formatPercentage = (number, decimalPlaces) =>
    (number * 100).toFixed(decimalPlaces) + '%'
