import { connect } from 'react-redux'
import { Equity } from '../'

const mapStateToProps = (state) => {
    const { hands } = state.equityReducer

    return {
        hands: hands
    }
}

export const EquityContainer = connect(
    mapStateToProps
)(Equity)
