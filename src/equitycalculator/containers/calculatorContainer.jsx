import { connect } from 'react-redux'
import { EquityCalculator, BOARD } from '../'

const mapStateToProps = (state, ownProps) => {
    const { handCount } = state.equityReducer
    const board = state.equityReducer.slots[BOARD]

    return {
        handCount,
        board
    }
}

export const CalculatorContainer = connect(mapStateToProps)(EquityCalculator)
