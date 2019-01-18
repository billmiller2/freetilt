import React, { Component } from 'react'

import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { HandModal, RangeModal } from './'
import { getSuitFromHTML, formatPercentage, ranks } from '../'

export class HandRange extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showHandModal: false,
            showRangeModal: false
        }

        this.getRange = this.getRange.bind(this)
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

    getPairSummary(pairs) {
        const sortedPairs = pairs.sort((a, b) => ranks.indexOf(a[0]) - ranks.indexOf(b[0]))
        let pairRanges = [{
            highest: '',
            lowest: ''
        }]

        sortedPairs.forEach((pair, i) => {
            const currentRange = pairRanges.length - 1

            if (pairRanges[currentRange].highest.length === 0) {
                pairRanges[currentRange].highest = pair
            }

            if ((i + 1) === sortedPairs.length) {
                pairRanges[currentRange].lowest = pair
            } else if (ranks.indexOf(sortedPairs[i + 1][0]) - ranks.indexOf(sortedPairs[i][0]) !== 1) {
                pairRanges[currentRange].lowest = pair
                pairRanges.push({
                    highest: '',
                    lowest: ''
                })
            }
        })

        let pairSummary = ''

        pairRanges.forEach((pairRange, i) => {
            pairSummary += pairRange.highest

            if (pairRange.highest !== pairRange.lowest) {
                pairSummary += '-' + pairRange.lowest
            }
            if (pairRanges.length === 1 && sortedPairs.indexOf('AA') !== -1 && sortedPairs.length > 1) {
                pairSummary = pairRange.lowest + '+'
            }
            if ((i + 1) < pairRanges.length) {
                pairSummary += ', '
            }
        })

        return pairSummary
    }

    getRange(range) {
        const pairs = range.filter(hand => hand.length === 2)
        const nonPairs = range.filter(hand => hand.length === 3)
        let rangeSummary = this.getPairSummary(pairs)

        nonPairs.forEach((hand, i) => {
            if (i === 0 && pairs.length > 0) {
                rangeSummary += ', '
            }

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
            ranges,
            displayEquities
        } = this.props

        const hand = slots[number]
        const latestEquities = savedEquities[savedEquities.length - 1]
        const equity = latestEquities.equities[number - 1]
        const addHandTooltip = <Tooltip id="add-tooltip" className="tooltip">Add Hand</Tooltip>
        const removeHandTooltip = <Tooltip id="remove-tooltip" className="tooltip">Remove Hand</Tooltip>
        const range = ranges[number]

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
