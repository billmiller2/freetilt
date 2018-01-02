import * as React from 'react'
import { Card } from './'

export class HandCard extends React.Component {
    render() {
        const { onSelect, rank, suit } = this.props
        return <Card
            onSelect={onSelect}
            rank={rank}
            suit={suit} />
    }
}
