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

export const generateBoard = (handOne = [], handTwo = [], existingBoard = []) => {
    let board = []

    for (let i = 0; i < 5; i++) {
        if (existingBoard[i].length > 0) {
            board.push(existingBoard[i])
            continue
        }
        let card = generateCard()

        if (board.indexOf(card) === -1
            && handOne.indexOf(card) === -1
            && handTwo.indexOf(card) === -1
        ) {
            board.push(card)
            continue
        }
        i--
    }

    return board
}
