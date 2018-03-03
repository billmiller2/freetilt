import { connect } from 'react-redux'
import { Equity} from '../'

const mapStateToProps = (state) => {
    const { savedEquities } = state.equityReducer

    return {
        savedEquities
    }
}

export const EquityContainer = connect(
    mapStateToProps
)(Equity)
