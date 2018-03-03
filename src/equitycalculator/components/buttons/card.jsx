import * as React from 'react'
import { Button } from 'react-bootstrap'
import { getSuitFromHTML } from '../../'

export class Card extends React.Component {
    render() {
        const { rank, suit, disabled, isSelected } = this.props
        const suitClass = suit ? getSuitFromHTML(suit.charCodeAt()) : ''
        const selectedClass = isSelected ? ' selectedCard' : ''

        return (
            <Button
                disabled={disabled}
                className={"cardButton " + suitClass + selectedClass}
                onClick={this.props.onSelect}>
                {rank + suit}
            </Button>
        )
    }
}
