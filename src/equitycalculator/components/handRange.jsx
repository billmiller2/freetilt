import React, { Component } from 'react'

import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { HandModal, RangeModal } from './'
import { getSuitFromHTML, formatPercentage } from '../'

export class HandRange extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showHandModal: false,
            showRangeModal: false
        }

        this.toggleHandModal = this.toggleHandModal.bind(this)
        this.toggleRangeModal = this.toggleRangeModal.bind(this)
    }

    toggleHandModal() {
        this.setState({
            showHandModal: !this.state.showHandModal
        })
    }

    toggleRangeModal() {
        this.setState({
            showRangeModal: !this.state.showRangeModal
        })
    }

    render() {
        const {
            showPlus,
            showMinus,
            increment,
            decrement,
            number,
            savedEquities
        } = this.props
        const hand = savedEquities[savedEquities.length - 1].hands[number]
        const equity = savedEquities[savedEquities.length - 1].equities[number - 1]
        const addHandTooltip = <Tooltip id="add-tooltip" className="tooltip">Add Hand</Tooltip>
        const removeHandTooltip = <Tooltip id="remove-tooltip" className="tooltip">Remove Hand</Tooltip>

        return (
            <div className="handRangeRow">
                <button className="btn btn-default" onClick={this.toggleHandModal}>
                    Hand
                </button>
                <button className="btn btn-default" onClick={this.toggleRangeModal}>
                    Range
                </button>
                &nbsp;&nbsp;
                {Object.values(hand).map((card, i) => {
                    const suit = getSuitFromHTML(card.suit.charCodeAt())
                    return (
                        <span key={i} className={suit}>
                            {card.rank + card.suit}
                        </span>
                    )
                })}
                &nbsp;&nbsp;
                {typeof equity !== 'undefined' && formatPercentage(equity.equity, 0)}
                &nbsp;
                {(typeof equity !== 'undefined' && equity.equity === 1)
                    && <span className="glyphicon glyphicon-ok" />
                }
                {showMinus &&
                    <OverlayTrigger placement="top" overlay={removeHandTooltip}>
                        <button className="btn btn-default handCountModifier" onClick={decrement}>
                            <span className="glyphicon glyphicon-minus" />
                        </button>
                    </OverlayTrigger>
                }
                {showPlus &&
                    <OverlayTrigger placement="top" overlay={addHandTooltip}>
                        <button className="btn btn-default handCountModifier" onClick={increment}>
                            <span className="glyphicon glyphicon-plus" />
                        </button>
                    </OverlayTrigger>
                }
                <HandModal
                    show={this.state.showHandModal}
                    onClose={this.toggleHandModal}
                    number={number} />
                <RangeModal
                    show={this.state.showRangeModal}
                    onClose={this.toggleRangeModal}
                    number={number} />
            </div>
        )
    }
}
