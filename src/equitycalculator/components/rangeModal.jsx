import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import { ranks } from '../'

export class RangeModal extends Component {
    render() {
        const { show, onClose } = this.props

        return (
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h4>Range</h4>
                    {ranks.map((rankOne, i) => {
                        let suited = 'o'
                        return (
                            <div className="row rangeRow" key={rankOne + i}>
                                {ranks.map(rankTwo => {
                                    if (suited.length === 0) {
                                        suited = 's'
                                    }

                                    if (rankOne === rankTwo) {
                                        suited = ''
                                    }

                                    let btnClass = ''

                                    switch (suited) {
                                        case 's':
                                            btnClass = 'suitedRangeBtn'
                                            break;
                                        case 'o':
                                            btnClass = 'offsuitRangeBtn'
                                            break;
                                        default:
                                            btnClass = 'pairRangeBtn'
                                    }

                                    return (
                                        <button className={"btn btn-sm rangeBtn " + btnClass} key={rankOne + rankTwo}>
                                            {rankOne + rankTwo + suited}
                                        </button>
                                    )
                                })}
                            </div>
                        )
                    })}
                </Modal.Body>
            </Modal>
        )
    }
}
