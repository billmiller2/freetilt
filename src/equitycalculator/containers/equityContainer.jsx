import { connect } from 'react-redux'
import { Equity } from '../'
import { getHandRank } from '../'

const mapStateToProps = (state) => {
    const { hands } = state.equityReducer

    getHandRank(hands[1])

    return {
        hands: hands
    }
}

export const EquityContainer = connect(
    mapStateToProps
)(Equity)
