import { connect } from 'react-redux'
import { Breakdown } from '../'

const mapStateToProps = (state) => {
    const { savedEquities } = state.equityReducer
    const { equities, hands } = savedEquities[savedEquities.length - 1]

    return {
        equities,
        hands
    }
}

export const BreakdownContainer = connect(
    mapStateToProps
)(Breakdown)
