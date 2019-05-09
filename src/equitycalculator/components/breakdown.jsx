import * as React from 'react'
import { handRankings, getHand, getRangeSummary } from '../'
import { BreakdownRow } from './'

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
                        {Object.values(hands).map((range, i) => {
                            return (
                                <td key={i}>
                                    {range.length === 1
                                        ? getHand(range[0])
                                        : getRangeSummary(range, true)}
                                </td>
                            )
                        })}
                    </tr>
                    {handRankings.map((handRanking, i) =>
                        <BreakdownRow key={i} ranking={handRanking} equities={equities} />
                    )}
                </tbody>
            </table>
        </div>
    )
}
