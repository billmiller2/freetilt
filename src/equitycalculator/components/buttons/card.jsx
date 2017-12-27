import * as React from 'react'
import { Button } from 'react-bootstrap'
import { getSuitFromHTML } from '../../'

export class Card extends React.Component {
    render() {
        const { rank, suit } = this.props
        let suitClass = suit ? getSuitFromHTML(suit.charCodeAt()) : ''

        return (
            <Button className={"cardButton " + suitClass}>
                {rank + suit}
            </Button>
        )
    }
}
