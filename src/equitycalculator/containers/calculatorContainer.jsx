import { connect } from 'react-redux'
import { EquityCalculator } from '../'

const mapStateToProps = (state, ownProps) => {
    const { handCount } = state.equityReducer

    return {
        handCount
    }
}

export const CalculatorContainer = connect(mapStateToProps)(EquityCalculator)
