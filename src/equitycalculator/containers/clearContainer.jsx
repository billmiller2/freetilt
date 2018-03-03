import { connect } from 'react-redux'
import { ClearButton, clearHands, getHandsFromSlots } from '../'

const mapStateToProps = (state) => {
    const { slots } = state.equityReducer
    const hands = getHandsFromSlots(slots)
    const displayButton = hands[1][1].rank.length > 0
        || hands[1][2].rank.length > 0
        || hands[2][1].rank.length > 0
        || hands[2][2].rank.length > 0

    return {
        displayButton
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(clearHands())
    }
}

export const ClearContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClearButton)
