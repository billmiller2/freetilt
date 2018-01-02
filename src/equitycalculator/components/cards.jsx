import * as React from 'react'
import { Col } from 'react-bootstrap'
import { suits, ranks } from '../'
import { BoardCard } from './'

export class Cards extends React.Component {
    render() {
        return (
            <div>
            {suits.map((suit, i) => 
                <Col key={i} xs={3}>
                    {ranks.map((rank, j) => {
                        return [
                            <BoardCard 
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
