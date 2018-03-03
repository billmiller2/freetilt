import * as React from 'react'
import { BoardCard } from './buttons'
import { BOARD } from '../'

export const Board = (props) => {
    const {
        onSelect,
        board,
        selectedPosition,
        selectedCard
    } = props
    let boardCards = []

    for (let i = 0; i < 5; i++) {
        boardCards.push(
            <BoardCard
                key={i}
                disabled={false}
                rank={board[i + 1].rank}
                suit={board[i + 1].suit}
                isSelected={(selectedPosition === BOARD) && (selectedCard === i + 1)}
                onSelect={() => onSelect(BOARD, i + 1)}/>
        )
    }

    return (
        <div>
            <h4>Board</h4>
            {boardCards}
        </div>
    )
}
