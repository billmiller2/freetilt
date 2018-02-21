import { connect } from 'react-redux'
import { Hand } from '../'
import { selectPosition } from '../'

const mapStateToProps = (state, ownProps) => {
    const { number } = ownProps
    const hand = state.equityReducer.hands[number]
    const { selectedCard, selectedHand } = state.equityReducer

    return {
        hand,
        selectedCard,
        selectedHand
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
