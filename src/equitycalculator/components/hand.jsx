import * as React from 'react'
import { HandCard } from './'
import { HAND_ONE, HAND_TWO } from '../'

export class Hand extends React.Component {
    render() {
        const { hand, onSelect, number } = this.props
        return (
            <div>
                <h4>Hand {number}</h4>
                <HandCard
                    rank={hand[1].rank}
                    suit={hand[1].suit}
                    onSelect={() => onSelect(number, HAND_ONE)} />
                <HandCard
                    rank={hand[2].rank}
                    suit={hand[2].suit}
                    onSelect={() => onSelect(number, HAND_TWO)} />
            </div>
        )
    }
}
