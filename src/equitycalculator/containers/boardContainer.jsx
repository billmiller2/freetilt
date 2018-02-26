import { connect } from 'react-redux'
import { Board } from '../'
import { selectPosition } from '../'

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (hand, card) => {
            dispatch(selectPosition(hand, card))
        }
    }
}

export const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)
