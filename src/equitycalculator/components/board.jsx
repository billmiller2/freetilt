import * as React from 'react'
import { BoardCard } from './buttons'
import { BOARD } from '../'

export const Board = (props) => {
    const { onSelect, board } = props
    let boardCards = []

    for (let i = 0; i < 5; i++) {
        boardCards.push(
            <BoardCard
                key={i}
                disabled={false}
                rank={board[i + 1].rank}
                suit={board[i + 1].suit}
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
