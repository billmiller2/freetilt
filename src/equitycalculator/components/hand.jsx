import * as React from 'react'
import { Card } from './'

export const Hand = (props) => (
    <div>
        <h4>Hand {props.number}</h4>
        <Card rank='' suit=''/>
        <Card rank='' suit=''/>
    </div>
)
