import { connect } from 'react-redux'
import { BoardButton } from '../components'

import { selectPosition, BOARD } from '../'

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => {
            dispatch(selectPosition(BOARD, 1))
        }
    }
}

export const BoardButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardButton)
