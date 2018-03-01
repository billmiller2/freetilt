import { ranks, suits } from '../'

export const generateCard = () => {
    const rank = ranks[Math.floor(Math.random() * ranks.length)]
    const suit = suits[Math.floor(Math.random() * suits.length)]

    return rank + suit
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
