import { connect } from 'react-redux'
import { Board, BOARD, selectPosition } from '../'

const mapStateToProps = (state) => {
    const { selectedCard, selectedPosition } = state.equityReducer
    const board = state.equityReducer.slots[BOARD]

    return {
        selectedCard,
        selectedPosition,
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
