import { connect } from 'react-redux'
import { Hand } from '../'
import { selectPosition } from '../'

const mapStateToProps = (state, ownProps) => {
    const { selectedCard, selectedPosition } = state.equityReducer
    const { number } = ownProps
    const position = state.equityReducer.slots[number]

    return {
        position,
        selectedCard,
        selectedPosition
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (hand, card) => {
            dispatch(selectPosition(hand, card))
        }
    }
}

export const HandContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Hand)
