import { connect } from 'react-redux'
import { HandRange } from '../components'
import {
    selectPosition,
    incrementHands,
    decrementHands,
    addToRange,
    removeFromRange
} from '../'

const mapStateToProps = (state, ownProps) => {
    const {
        selectedCard,
        selectedPosition,
        handCount,
        savedEquities,
        slots,
        ranges,
        displayEquities
    } = state.equityReducer
    const { number } = ownProps
    const position = state.equityReducer.slots[number]
    const showPlus = number === handCount
    const showMinus = number === handCount && handCount > 2

    return {
        position,
        selectedCard,
        selectedPosition,
        showPlus,
        showMinus,
        savedEquities,
        slots,
        ranges,
        displayEquities
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (hand, card) => {
            dispatch(selectPosition(hand, card))
        },
        increment: () => dispatch(incrementHands()),
        decrement: () => dispatch(decrementHands()),
        addToRange: (number, hand) => dispatch(addToRange(number, hand)),
        removeFromRange: (number, hand) => dispatch(removeFromRange(number, hand))
    }
}

export const HandRangeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HandRange)
