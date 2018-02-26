import * as React from 'react'
import { BoardCard } from './buttons'
import { BOARD } from '../'

export const Board = (props) => {
    const { onSelect } = props
    let boardCards = []

    for (let i = 0; i < 5; i++) {
        boardCards.push(
            <BoardCard
                key={i}
                disabled={false}
                rank=""
                suit=""
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
