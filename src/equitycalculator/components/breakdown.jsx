import * as React from 'react'

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
                        <td>
                            {hands[1][1].rank
                                + hands[1][1].suit
                                + hands[1][2].rank
                                + hands[1][2].suit}
                        </td>
                        <td>
                            {hands[2][1].rank
                                + hands[2][1].suit
                                + hands[2][2].rank
                                + hands[2][2].suit}
                        </td>
                    </tr>
                    <tr>
                        <th>Equity</th>
                        <td>{equities[0].equity}</td>
                        <td>{equities[1].equity}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
