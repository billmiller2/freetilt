import { ranks, suits } from '../'

export const generateCard = () => {
    const rank = ranks[Math.floor(Math.random() * ranks.length)]
    const suit = suits[Math.floor(Math.random() * suits.length)]

    return rank + suit
}

export const generateBoard = (handOne = [], handTwo = []) => {
    let board = []

    while (board.length < 5) {
        let card = generateCard()

        if (board.indexOf(card) === -1
            && handOne.indexOf(card) === -1
            && handTwo.indexOf(card) === -1
        ) {
            board.push(card)
        }
    }

    return board
}
