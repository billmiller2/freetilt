import { connect } from 'react-redux'
import {
    EvaluateButton,
    saveEquity,
    getHandsFromSlots,
    getHandsFromRangeHand,
    getHandEquity,
    BOARD
} from '../'

const mapStateToProps = (state) => {
    const { slots, ranges, savedEquities } = state.equityReducer
    const hands = getHandsFromSlots(slots)
    let disabled = false
    Object.entries(hands).forEach(function(hand) {
        if (hand[1][1].rank.length === 0 || hand[1][2].rank.length === 0) {
            disabled = true
        }
    })

    return {
        slots,
        ranges,
        savedEquities,
        disabled
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveEquity: (slots, ranges, savedEquities) => {
            let hands = getHandsFromSlots(slots)
            //let savedEquity = []
            let board = {}
            board = slots[BOARD]

            //for (let i = 0; i < savedEquities.length; i++) {
                //if (JSON.stringify(savedEquities[i].hands) === JSON.stringify(hands)
                    //&& JSON.stringify(savedEquities[i].board) === JSON.stringify(board)
                //) {
                    //savedEquity = savedEquities[i].equities
                //}
            //}

            //const handEquities = savedEquity.length > 0 ? savedEquity : getHandEquity(hands, board)

            let rangeHands = []

            Object.values(ranges).forEach((range, i) => {
                if (range.length > 0) {
                    rangeHands[i] = []
                }

                range.forEach(rangeHand => {
                    rangeHands[i] = rangeHands[i].concat(getHandsFromRangeHand(rangeHand))
                })
            })

            rangeHands.forEach((range, i) => {
                if (rangeHands[i].length > 0) {
                    hands[i + 1] = rangeHands[i]
                }
            })

            Object.values(hands).forEach((hand, i) => {
                if (!Array.isArray(hands[i + 1])) {
                    hands[i + 1] = [hands[i + 1]]
                }
            })

            const handEquities = getHandEquity(hands, board)
            dispatch(saveEquity(hands, board, handEquities))
        }
    }
}

export const EvaluateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EvaluateButton)
