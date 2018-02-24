import * as React from 'react'
import { BoardCard } from './buttons'

export const Board = () => {
    let boardCards = []

    for (let i = 0; i < 5; i++) {
        boardCards.push(
            <BoardCard
                disabled={false}
                rank=""
                suit=""
                onSelect={() => {}}/>
        )
    }

    return (
        <div>
            <h4>Board</h4>
            {boardCards}
        </div>
    )
}
