import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import { ranks } from '../'

export class RangeModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            adding: true
        }

        this.setAddingOrRemoving = this.setAddingOrRemoving.bind(this)
        this.toggleSelection = this.toggleSelection.bind(this)
    }

    setAddingOrRemoving(hand) {
        let adding = false

        if (this.props.range.indexOf(hand) === -1) {
            adding = true
        }

        this.setState({
            adding: adding
        }, this.toggleSelection(hand, adding))
    }

    toggleSelection(hand, adding = this.state.adding) {
        if (adding) {
            this.props.addToRange(this.props.number, hand)
        } else if (this.props.range.indexOf(hand) !== -1){
            this.props.removeFromRange(this.props.number, hand)
        }
    }

    render() {
        const { show, onClose, number, range } = this.props

        return (
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <h4>Range {number}</h4>
                </Modal.Header>
                <Modal.Body className="rangeModal">
                    <div className="rangeMatrix">
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

                                    let hand = rankOne + rankTwo + suited

                                    if (ranks.indexOf(rankTwo) < ranks.indexOf(rankOne)) {
                                        hand = rankTwo + rankOne + suited
                                    }

                                    if (range.indexOf(hand) !== -1) {
                                        btnClass += ' selectedRangeBtn'
                                    }

                                    return (
                                        <button
                                            className={"btn btn-sm rangeBtn " + btnClass}
                                            onMouseDown={() => this.setAddingOrRemoving(hand)}
                                            onMouseOver={(e) => {
                                                if (e.buttons === 1) {
                                                    this.toggleSelection(hand)
                                                }
                                            }}
                                            key={rankOne + rankTwo}>
                                            {hand}
                                        </button>
                                    )
                                })}
                            </div>
                        )
                    })}
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}
