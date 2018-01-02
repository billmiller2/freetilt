import * as React from 'react'
import { Card } from './'

export class BoardCard extends React.Component {
    render() {
        const { onSelect, rank, suit } = this.props

        return <Card
            onSelect={() => onSelect(rank, suit)}
            rank={rank}
            suit={suit} />
    }
}
