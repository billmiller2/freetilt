import * as React from 'react'
import { Card } from './'

export const Hand = (props) => (
    <div>
        <h4>Hand {props.number}</h4>
        <Card rank={props.hand[1].rank} suit={props.hand[1].suit} />
        <Card rank={props.hand[2].rank} suit={props.hand[2].suit} />
    </div>
)
