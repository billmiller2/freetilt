import * as React from 'react'
import { Card } from './'

export class BoardCard extends React.Component {
    render() {
        const { onSelect, rank, suit, disabled } = this.props

        return <Card
            disabled={disabled}
            isSelected={false}
            onSelect={() => onSelect(rank, suit)}
            rank={rank}
            suit={suit} />
    }
}
