import * as React from 'react'
import { getSuitFromHTML, formatPercentage } from '../'

export class Equity extends React.Component {
    render() {
        const { savedEquities } = this.props
        const hands = savedEquities[savedEquities.length - 1].hands
        const board = savedEquities[savedEquities.length - 1].board
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
                                {handEquities.length > 0 && formatPercentage(handEquities[i].equity, 0)}
                            </div>
                            </td>
                            <td>
                                {(handEquities.length > 0 && +handEquities[i].equity === 1)
                                    && <span className="glyphicon glyphicon-ok" />}
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td height="37">
                            {Object.entries(board).map((card, k) => {
                                let suit = getSuitFromHTML(card[1].suit.charCodeAt())
                                return (
                                    <span key={k} className={suit}>
                                        {card[1].rank + card[1].suit}
                                    </span>
                                )
                            })}
                        </td>
                        <td />
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
