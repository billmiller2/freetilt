import * as React from 'react'
import { Card } from './'

export class BankCard extends React.Component {
    render() {
        const { onSelect, rank, suit, disabled } = this.props

        return <Card
            disabled={disabled}
            onSelect={() => onSelect(rank, suit)}
            rank={rank}
            suit={suit} />
    }
}
