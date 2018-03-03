import * as React from 'react'
import { Card } from './'

export class BoardCard extends React.Component {
    render() {
        const { onSelect, rank, suit, disabled, isSelected } = this.props

        return <Card
            disabled={disabled}
            isSelected={isSelected}
            onSelect={() => onSelect(rank, suit)}
            rank={rank}
            suit={suit} />
    }
}
