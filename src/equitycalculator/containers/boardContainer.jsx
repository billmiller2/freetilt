import { connect } from 'react-redux'
import { Board, BOARD, selectPosition } from '../'

const mapStateToProps = (state) => {
    const board = state.equityReducer.slots[BOARD]

    return {
        board
    }
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
