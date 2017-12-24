import * as React from 'react'
import { Button } from 'react-bootstrap'

export const Card = (props) => (
    <Button>
        {props.rank + props.suit}
    </Button>
)

