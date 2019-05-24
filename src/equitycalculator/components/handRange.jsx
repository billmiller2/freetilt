import React, { Component } from 'react'
import $ from 'jquery'

import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { HandModal, RangeModal } from './'
import {
    getHand,
    getRange,
    formatPercentage,
} from '../'

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
            showMinus,
            decrement,
            number,
            savedEquities,
            slots,
            onSelect,
            addToRange,
            removeFromRange,
            ranges,
            displayEquities
        } = this.props

        const hand = slots[number]
        const latestEquities = savedEquities[savedEquities.length - 1]
        const equity = latestEquities.equities[number - 1]
        const removeHandTooltip = <Tooltip id="remove-tooltip" className="tooltip">Remove Hand</Tooltip>
        const range = ranges[number]
        const rangeLimit = ($(window).width()) > 500 ? 45 : 5

        return (
            <div className="handRangeRow">
                <button className="btn btn-default" onClick={() => {
                    this.toggleHandModal()
                    onSelect(number, 1)
                }}>
                    Hand
                </button>
                <button className="btn btn-default" onClick={this.toggleRangeModal}>
                    Range
                </button>
                &nbsp;&nbsp;
                {range.length === 0 && getHand(hand)}
                {range.length > 0 && getRange(range, rangeLimit)}
                &nbsp;&nbsp;
                {(typeof equity !== 'undefined' && displayEquities)
                    && <strong>{formatPercentage(equity.equity, 0)}</strong>
                }
                &nbsp;
                {(typeof equity !== 'undefined' && displayEquities && equity.equity === 1)
                    && <span className="glyphicon glyphicon-ok" />
                }
                {showMinus &&
                    <OverlayTrigger placement="top" overlay={removeHandTooltip}>
                        <button className="btn btn-default handCountModifier" onClick={decrement}>
                            <span className="glyphicon glyphicon-remove removeHandIcon" />
                        </button>
                    </OverlayTrigger>
                }
                <HandModal
                    show={this.state.showHandModal}
                    onClose={this.toggleHandModal}
                    number={number} />
                <RangeModal
                    addToRange={addToRange}
                    removeFromRange={removeFromRange}
                    range={ranges[number]}
                    show={this.state.showRangeModal}
                    onClose={this.toggleRangeModal}
                    number={number} />
            </div>
        )
    }
}
