import { connect } from 'react-redux'
import { HandRange } from '../components'
import {
    selectPosition,
    incrementHands,
    decrementHands
} from '../'

const mapStateToProps = (state, ownProps) => {
    const {
        selectedCard,
        selectedPosition,
        handCount,
        savedEquities,
        slots
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
        slots
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (hand, card) => {
            dispatch(selectPosition(hand, card))
        },
        increment: () => dispatch(incrementHands()),
        decrement: () => dispatch(decrementHands())
    }
}

export const HandRangeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HandRange)
