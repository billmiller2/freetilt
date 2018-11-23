import * as React from 'react'
import { Col } from 'react-bootstrap'
import { unicodeSuits, ranks } from '../'
import { BankCard } from './'

export class CardBank extends React.Component {
    render() {
        const { deadCards } = this.props
        return (
            <div>
            {unicodeSuits.map((suit, i) =>
                <Col key={i} xs={1} className="btn-col">
                    {ranks.map((rank, j) => {
                        const disabled = deadCards.includes(rank + suit) ? true : false

                        return [
                            <BankCard
                                disabled={disabled}
                                key={rank+suit}
                                onSelect={this.props.onSelect}
                                rank={rank}
                                suit={suit} />,
                            <br key={suit+rank} />
                        ]
                    })}
                </Col>
            )}
            </div>
        )
    }
}
