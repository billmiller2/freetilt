import { ranks, suits, unicodeSuits } from '../'
import { getSuitFromUnicode } from '../constants'

export const generateCard = () => {
    const rank = ranks[Math.floor(Math.random() * ranks.length)]
    const suit = suits[Math.floor(Math.random() * suits.length)]

    return rank + suit
}

export const generateCardObject = (rank, suit) => {
    return {
        rank: rank,
        suit: suit
    }
}

export const getCards = () => {
    let cards = {}

    ranks.forEach((rank) => {
        unicodeSuits.forEach((suit) => {
            cards[rank + getSuitFromUnicode(suit)] = generateCardObject(rank, suit)
        })
    })

    return cards
}

export const generateBoard = (hands, existingBoard = []) => {
    let board = []

    for (let i = 0; i < 5; i++) {
        if (existingBoard[i].length > 0) {
            board.push(existingBoard[i])
            continue
        }
        let card = generateCard()
        let decrement = true

        for (let i = 0; i < hands.length; i++) {
            if (board.indexOf(card) === -1
                && hands[i].indexOf(card) === -1
            ) {
                board.push(card)
                decrement = false
            }
        }
        if (decrement) {
            i--
        }
    }

    return board
}
