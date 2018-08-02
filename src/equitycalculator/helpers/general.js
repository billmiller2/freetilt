import { getSuitFromUnicode } from '../'

export const getCardStringFromObj = (card) => {
    return card.rank + getSuitFromUnicode(card.suit)
}

export const getHandsFromSlots = (slots) => {
    let hands = {}
    hands[1] = slots[1]
    hands[2] = slots[2]

    return hands
}

export const formatPercentage = (number, decimalPlaces) =>
    (number * 100).toFixed(decimalPlaces) + '%'
