import { connect } from 'react-redux'
import { EquityCalculator } from '../'

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {}
}

export const EquityContainer = connect(mapStateToProps)(EquityCalculator)
