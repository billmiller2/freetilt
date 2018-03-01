import { connect } from 'react-redux'
import { Cards, selectCard } from '../'

const mapStateToProps = (state) => {
    const { slots } = state.equityReducer
    let deadCards = []
    Object.entries(slots).map((slot) => {
        const limit = Object.keys(slot[1]).length + 1
        for (let i = 1; i < limit; i++) {
            if (slot[1][i].rank && slot[1][i].suit) {
                deadCards.push(slot[1][i].rank + slot[1][i].suit)
            }
        }
        return true
    })

    return {
        deadCards
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (rank, suit) => {
            dispatch(selectCard(rank, suit))
        }
    }
}

export const CardsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards)
