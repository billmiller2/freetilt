import { connect } from 'react-redux'
import { EquityCalculator } from '../'

const mapStateToProps = (state, ownProps) => {
    return {}
}

export const EquityContainer = connect(mapStateToProps)(EquityCalculator)
