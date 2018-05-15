import * as React from 'react'
import { getSuitFromHTML } from '../'

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
                        <td>{equities[0].HIGH_CARD}</td>
                        <td>{equities[1].HIGH_CARD}</td>
                    </tr>
                    <tr>
                        <th>Pair</th>
                        <td>{equities[0].PAIR}</td>
                        <td>{equities[1].PAIR}</td>
                    </tr>
                    <tr>
                        <th>Two Pair</th>
                        <td>{equities[0].TWO_PAIR}</td>
                        <td>{equities[1].TWO_PAIR}</td>
                    </tr>
                    <tr>
                        <th>Set</th>
                        <td>{equities[0].SET}</td>
                        <td>{equities[1].SET}</td>
                    </tr>
                    <tr>
                        <th>Straight</th>
                        <td>{equities[0].STRAIGHT}</td>
                        <td>{equities[1].STRAIGHT}</td>
                    </tr>
                    <tr>
                        <th>Flush</th>
                        <td>{equities[0].FLUSH}</td>
                        <td>{equities[1].FLUSH}</td>
                    </tr>
                    <tr>
                        <th>Boat</th>
                        <td>{equities[0].BOAT}</td>
                        <td>{equities[1].BOAT}</td>
                    </tr>
                    <tr>
                        <th>Quads</th>
                        <td>{equities[0].QUADS}</td>
                        <td>{equities[1].QUADS}</td>
                    </tr>
                    <tr>
                        <th>Straight Flush</th>
                        <td>{equities[0].STRAIGHT_FLUSH}</td>
                        <td>{equities[1].STRAIGHT_FLUSH}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
