import { connect } from 'react-redux'
import {
    Equity,
    generateBoard,
    handRanks,
    breakTies,
    evaluateHandStrength,
    getCards
} from '../'

const mapStateToProps = (state) => {
    const { hands } = state.equityReducer

    let handOneWins = 0
    let handTwoWins = 0

    for (let i = 0; i < 1000; i++) {
        const board = generateBoard()

        const handOneCards = getCards(hands[1], board)
        const handTwoCards = getCards(hands[2], board)

        const handOneRank = evaluateHandStrength(handOneCards)
        const handTwoRank = evaluateHandStrength(handTwoCards)

        if (handRanks.indexOf(handOneRank) > handRanks.indexOf(handTwoRank)) {
            handOneWins++
        } else if (handRanks.indexOf(handOneRank) < handRanks.indexOf(handTwoRank)) {
            handTwoWins++
        } else {
            const tieWinner = breakTies(handOneCards, handTwoCards, handOneRank)

            if (tieWinner === 1) {
                handOneWins++
            }

            if (tieWinner === 2) {
                handTwoWins++
            }
        }
    }

    return {
        hands: hands
    }
}

export const EquityContainer = connect(
    mapStateToProps
)(Equity)
