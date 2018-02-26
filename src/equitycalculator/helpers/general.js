import { getSuitFromUnicode, HAND_ONE, HAND_TWO } from '../'

export const getCardStringFromObj = (card) => {
    return card.rank + getSuitFromUnicode(card.suit)
}

export const getHandsFromSlots = (slots) => {
    let hands = {}
    hands[HAND_ONE] = slots[HAND_ONE]
    hands[HAND_TWO] = slots[HAND_TWO]

    return hands
}
