import * as React from 'react'
import { getSuitFromHTML } from '../'

export class Equity extends React.Component {
    render() {
        const { savedEquities } = this.props
        const hands = savedEquities[savedEquities.length - 1].hands
        const handEquities = savedEquities[savedEquities.length - 1].equities

        return (
            <div>
                <h4>Equity</h4>
                <table className="table">
                    <tbody>
                    {Object.entries(hands).map((hand, i) =>
                        <tr key={i}>
                            <td height="37">
                            {Object.entries(hand[1]).map((card, j) => {
                                let suit = getSuitFromHTML(card[1].suit.charCodeAt())
                                return (
                                    <span key={j} className={suit}>
                                        {card[1].rank + card[1].suit}
                                    </span>
                                )
                            })}
                            <div className="pull-right">
                                {handEquities.length > 0 && (handEquities[i] * 100).toFixed(0) + '%'}
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
