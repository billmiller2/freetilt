import * as React from 'react'
import { HandCard } from './'
import { HAND_ONE, HAND_TWO } from '../'

export class Hand extends React.Component {
    render() {
        const { position, onSelect, number } = this.props

        return (
            <div>
                <h4>Hand {number}</h4>
                <HandCard
                    rank={position[1].rank}
                    suit={position[1].suit}
                    onSelect={() => onSelect(number, HAND_ONE)} />
                <HandCard
                    rank={position[2].rank}
                    suit={position[2].suit}
                    onSelect={() => onSelect(number, HAND_TWO)} />
            </div>
        )
    }
}
