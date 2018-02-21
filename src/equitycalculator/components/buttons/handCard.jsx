import * as React from 'react'
import { Card } from './'

export class HandCard extends React.Component {
    render() {
        const { onSelect, rank, suit, isSelected } = this.props
        return <Card
            onSelect={onSelect}
            isSelected={isSelected}
            rank={rank}
            suit={suit} />
    }
}
