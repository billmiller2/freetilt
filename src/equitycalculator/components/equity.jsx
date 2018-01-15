import * as React from 'react'
import { getSuitFromHTML } from '../'

export class Equity extends React.Component {
    render() {
        const { hands, handEquities } = this.props

        return (
            <div>
                <h4>Equity</h4>
                <table className="table table-striped">
                    <tbody>
                    {Object.entries(hands).map((hand, i) =>
                        <tr key={i}>
                            <td>
                            {Object.entries(hand[1]).map((card, j) => {
                                let suit = getSuitFromHTML(card[1].suit.charCodeAt())
                                return (
                                    <span key={j} className={suit}>
                                        {card[1].rank + card[1].suit}
                                    </span>
                                )
                            })}
                            <div className="pull-right">
                                {handEquities[i]}
                            </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}
