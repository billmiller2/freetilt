import { connect } from 'react-redux'
import { Hand } from '../'

const mapStateToProps = (state, ownProps) => {
    const { number } = ownProps
    const hand = state.equityReducer.hands[number]

    return {
        hand: hand
    }
}

export const HandContainer = connect(
    mapStateToProps
)(Hand)
