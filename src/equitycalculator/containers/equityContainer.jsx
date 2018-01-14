import { connect } from 'react-redux'
import { Equity, getHandRank, generateBoard, handRanks } from '../'

const mapStateToProps = (state) => {
    const { hands } = state.equityReducer

    let handOneWins = 0
    let handTwoWins = 0

    for (let i = 0; i < 10000; i++) {
        const board = generateBoard()
        const handOneRank = getHandRank(hands[1], board)
        const handTwoRank = getHandRank(hands[2], board)

        if (handRanks.indexOf(handOneRank) > handRanks.indexOf(handTwoRank)) {
            handOneWins++
        } else if (handRanks.indexOf(handOneRank) < handRanks.indexOf(handTwoRank)) {
            handTwoWins++
        } else {
        }
    }

    console.log(handOneWins)
    console.log(handTwoWins)

    return {
        hands: hands
    }
}

export const EquityContainer = connect(
    mapStateToProps
)(Equity)
