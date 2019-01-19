import { connect } from 'react-redux'
import { ClearButton, clearHands } from '../'

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(clearHands())
    }
}

export const ClearContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClearButton)
