import * as React from 'react'
import { Button } from 'react-bootstrap'
import { getSuitFromHTML } from '../../'

export class Card extends React.Component {
    render() {
        const { rank, suit, disabled } = this.props
        let suitClass = suit ? getSuitFromHTML(suit.charCodeAt()) : ''

        return (
            <Button
                disabled={disabled}
                className={"cardButton " + suitClass}
                onClick={this.props.onSelect}>
                {rank + suit}
            </Button>
        )
    }
}
