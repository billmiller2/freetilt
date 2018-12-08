import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import { ranks } from '../'

export class RangeModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            adding: true,
            selectedHands: []
        }

        this.setAddingOrRemoving = this.setAddingOrRemoving.bind(this)
        this.toggleSelection = this.toggleSelection.bind(this)
    }

    setAddingOrRemoving(hand) {
        let adding = false

        if (this.state.selectedHands.indexOf(hand) === -1) {
            adding = true
        }

        this.setState({
            adding: adding
        }, this.toggleSelection(hand, adding))
    }

    toggleSelection(hand, adding = this.state.adding) {
        let selectedHands = this.state.selectedHands.slice()
        const index = selectedHands.indexOf(hand)

        if (adding) {
            selectedHands.push(hand)
        } else if (index !== -1){
            selectedHands.splice(index, 1)
        }

        this.setState({
            selectedHands: selectedHands
        })
    }

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

                                    let hand = rankOne + rankTwo + suited

                                    if (ranks.indexOf(rankTwo) < ranks.indexOf(rankOne)) {
                                        hand = rankTwo + rankOne + suited
                                    }

                                    if (this.state.selectedHands.indexOf(hand) !== -1) {
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
                </Modal.Body>
            </Modal>
        )
    }
}
