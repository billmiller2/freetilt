import { connect } from 'react-redux'
import { Equity, getHandEquity } from '../'

const mapStateToProps = (state) => {
    const { hands } = state.equityReducer
    const handEquities = getHandEquity(hands)

    return {
        hands,
        handEquities
    }
}

export const EquityContainer = connect(
    mapStateToProps
)(Equity)
