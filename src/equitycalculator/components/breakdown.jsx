import * as React from 'react'
import { getSuitFromHTML, handRankings } from '../'
import { BreakdownRow } from './'

export const Breakdown = (props) => {
    const { equities, hands } = props

    //if (equities.length === 0) {
        return <div />
    //}

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
                    {handRankings.map((handRanking, i) =>
                        <BreakdownRow key={i} ranking={handRanking} equities={equities} />
                    )}
                </tbody>
            </table>
        </div>
    )
}
