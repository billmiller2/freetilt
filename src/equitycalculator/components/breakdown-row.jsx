import React from 'react'
import { formatPercentage } from '../'

export const BreakdownRow = (props) => {
    const title = props.ranking.toLowerCase().replace(/_/, ' ')
    return (
        <tr>
            <th className="capitalize">{title}</th>
            {props.equities.map((equity, i) =>
                <td key={i}>
                    {formatPercentage(equity[props.ranking], 2)}
                </td>
            )}
        </tr>
    )
}

