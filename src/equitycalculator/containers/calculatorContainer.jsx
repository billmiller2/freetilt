import { connect } from 'react-redux'
import { EquityCalculator } from '../'

const mapStateToProps = (state, ownProps) => {
    return {}
}

export const CalculatorContainer = connect(mapStateToProps)(EquityCalculator)
