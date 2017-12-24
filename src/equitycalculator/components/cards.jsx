import * as React from 'react'
import { Col } from 'react-bootstrap'
import { suits, ranks } from '../'

export class Cards extends React.Component {
    render() {
        return (
            <div>
            {suits.map((suit, i) => 
                <Col key={i} xs={3}>
                    {ranks.map((rank, i) => {
                        return [(rank + suit), <br key={i} />]
                    })}
                </Col>
            )}                
            </div>
        )
    }
}

