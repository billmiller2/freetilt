import * as React from 'react'
import { Button } from 'react-bootstrap'
import { getSuitFromHTML } from '../../'

export class Card extends React.Component {
    render() {
        let suit = getSuitFromHTML(this.props.suit.charCodeAt())

        return (
            <Button className={"cardButton " + suit}>
                {this.props.rank + this.props.suit}
            </Button>
        )
    }
}
