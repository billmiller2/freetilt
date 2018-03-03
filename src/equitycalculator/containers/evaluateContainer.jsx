import { connect } from 'react-redux'
import {
    EvaluateButton,
    saveEquity,
    getHandsFromSlots,
    getHandEquity,
    BOARD
} from '../'

const mapStateToProps = (state) => {
    const { slots, savedEquities } = state.equityReducer
    const hands = getHandsFromSlots(slots)
    let disabled = false
    Object.entries(hands).map(hand => {
        if (hand[1][1].rank.length === 0 || hand[1][2].rank.length === 0) {
            disabled = true
        }
    })

    return {
        slots,
        savedEquities,
        disabled
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveEquity: (slots, savedEquities) => {
            let hands = getHandsFromSlots(slots)
            let savedEquity = []

            for (let i = 0; i < savedEquities.length; i++) {
                if (JSON.stringify(savedEquities[i].hands) === JSON.stringify(hands)) {
                    savedEquity = savedEquities[i].equities
                }
            }

            let board = {}
            board = slots[BOARD]

            const handEquities = savedEquity.length > 0 ? savedEquity : getHandEquity(hands, board)
            dispatch(saveEquity(hands, handEquities))
        }
    }
}

export const EvaluateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EvaluateButton)
