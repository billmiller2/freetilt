import { getSuitFromUnicode } from '../'

export const getCardStringFromObj = (card) => {
    return card.rank + getSuitFromUnicode(card.suit)
}
