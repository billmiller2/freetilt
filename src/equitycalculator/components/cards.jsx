import * as React from 'react'
import { Col } from 'react-bootstrap'
import { suits } from '../'

export class Cards extends React.Component {
    render() {
        let cols = []

        for (let i = 0; i < suits.length; i++) {
            cols.push(<Col key={i} xs={3}>{suits[i]}</Col>)
        }

        return (
            <div>
                {cols}
            </div>
        )
    }
}

