import * as React from 'react'
import { getSuitFromHTML, formatPercentage } from '../'

export const Breakdown = (props) => {
    const { equities, hands } = props

    if (equities.length === 0) {
        return <div />
    }

    return (
        <div>
            <h4>Breakdown</h4>
            <table className="table">
                <tbody>
                    <tr>
                        <th></th>
                        {Object.entries(hands).map((hand, i) =>
                            <td key={i}>
                            {Object.entries(hand[1]).map((card, j) => {
                                const suit = getSuitFromHTML(card[1].suit.charCodeAt())

                                return (
                                    <span className={suit} key={j}>
                                        {card[1].rank + card[1].suit}
                                    </span>
                                )
                            })}
                            </td>
                        )}
                    </tr>
                    <tr>
                        <th>High Card</th>
                        <td>{formatPercentage(equities[0].HIGH_CARD, 2)}</td>
                        <td>{formatPercentage(equities[1].HIGH_CARD, 2)}</td>
                    </tr>
                    <tr>
                        <th>Pair</th>
                        <td>{formatPercentage(equities[0].PAIR, 2)}</td>
                        <td>{formatPercentage(equities[1].PAIR, 2)}</td>
                    </tr>
                    <tr>
                        <th>Two Pair</th>
                        <td>{formatPercentage(equities[0].TWO_PAIR, 2)}</td>
                        <td>{formatPercentage(equities[1].TWO_PAIR, 2)}</td>
                    </tr>
                    <tr>
                        <th>Set</th>
                        <td>{formatPercentage(equities[0].SET, 2)}</td>
                        <td>{formatPercentage(equities[1].SET, 2)}</td>
                    </tr>
                    <tr>
                        <th>Straight</th>
                        <td>{formatPercentage(equities[0].STRAIGHT, 2)}</td>
                        <td>{formatPercentage(equities[1].STRAIGHT, 2)}</td>
                    </tr>
                    <tr>
                        <th>Flush</th>
                        <td>{formatPercentage(equities[0].FLUSH, 2)}</td>
                        <td>{formatPercentage(equities[1].FLUSH, 2)}</td>
                    </tr>
                    <tr>
                        <th>Boat</th>
                        <td>{formatPercentage(equities[0].BOAT, 2)}</td>
                        <td>{formatPercentage(equities[1].BOAT, 2)}</td>
                    </tr>
                    <tr>
                        <th>Quads</th>
                        <td>{formatPercentage(equities[0].QUADS, 2)}</td>
                        <td>{formatPercentage(equities[1].QUADS, 2)}</td>
                    </tr>
                    <tr>
                        <th>Straight Flush</th>
                        <td>{formatPercentage(equities[0].STRAIGHT_FLUSH, 2)}</td>
                        <td>{formatPercentage(equities[1].STRAIGHT_FLUSH, 2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
