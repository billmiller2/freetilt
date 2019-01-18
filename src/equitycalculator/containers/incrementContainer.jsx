import { connect } from 'react-redux'
import { Increment } from '../components'
import { incrementHands } from '../'

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(incrementHands()),
    }
}

export const IncrementContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Increment)
