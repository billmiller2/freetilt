import { connect } from 'react-redux'
import { Hand } from '../'
import { selectPosition } from '../'

const mapStateToProps = (state, ownProps) => {
    const { number } = ownProps
    const position = state.equityReducer.slots[number]

    return {
        position
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
