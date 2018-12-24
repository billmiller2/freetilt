import React, { Component } from 'react'

import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { HandModal, RangeModal } from './'
//import { getSuitFromHTML, formatPercentage, BOARD } from '../'
import { getSuitFromHTML, formatPercentage, ranks } from '../'

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

    getHand(hand) {
        let formattedHand = []

        Object.values(hand).forEach((card, i) => {
            const suit = getSuitFromHTML(card.suit.charCodeAt())
            formattedHand.push(
                <span key={i} className={suit}>
                    {card.rank + card.suit}
                </span>
            )
        })

        return formattedHand
    }

    getRange(range) {
        const pairs = range.filter(hand => hand.length === 2)
        const nonPairs = range.filter(hand => hand.length === 3)
        let lowestPair = ''
        let highestPair = ''
        let rangeSummary = ''

        ranks.slice().forEach(rank => {
            if (pairs.indexOf(rank + rank) !== -1 && highestPair.length === 0) {
                highestPair = rank + rank

            }
        })

        ranks.slice().reverse().forEach((rank, i) => {
            if (pairs.indexOf(rank + rank) !== -1 && lowestPair.length === 0) {
                lowestPair = rank + rank

                if (rank !== 'A' && highestPair === 'AA') {
                    rangeSummary = lowestPair + '+'
                }
                rangeSummary = lowestPair

                if (rank !== 'A') {
                    if (highestPair === 'AA') {
                        rangeSummary += '+'
                    } else {
                        rangeSummary = highestPair + '-' + lowestPair
                    }
                }

                if (nonPairs.length > 0) {
                    rangeSummary += ', '
                }
            }
        })

        nonPairs.forEach((hand, i) => {
            rangeSummary += hand

            if ((i + 1) < nonPairs.length) {
                rangeSummary += ', '
            }
        })

        return rangeSummary
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
            savedEquities,
            slots,
            onSelect,
            addToRange,
            removeFromRange,
            ranges
        } = this.props

        const hand = slots[number]
        const latestEquities = savedEquities[savedEquities.length - 1]
        const equity = latestEquities.equities[number - 1]
        const addHandTooltip = <Tooltip id="add-tooltip" className="tooltip">Add Hand</Tooltip>
        const removeHandTooltip = <Tooltip id="remove-tooltip" className="tooltip">Remove Hand</Tooltip>
        const range = ranges[number]

        let displayEquities = true

        //if (JSON.stringify(latestEquities.board) !== JSON.stringify(slots[BOARD])) {
            //displayEquities = false
        //}

        //for (let i = 1; i < Object.keys(slots).length; i++) {
            //if (JSON.stringify(slots[i]) !== JSON.stringify(latestEquities.hands[i])) {
                //displayEquities = false
            //}
        //}

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
                {range.length === 0 && this.getHand(hand)}
                {range.length > 0 && this.getRange(range)}
                &nbsp;&nbsp;
                {(typeof equity !== 'undefined' && displayEquities) && formatPercentage(equity.equity, 0)}
                &nbsp;
                {(typeof equity !== 'undefined' && displayEquities && equity.equity === 1)
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
