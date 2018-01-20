import { connect } from 'react-redux'
import { Cards, selectCard } from '../'

const mapStateToProps = (state) => {
    const { hands } = state.equityReducer
    let deadCards = []
    Object.entries(hands).map((hand) => {
        for (let i = 1; i < 3; i++) {
            if (hand[1][i].rank && hand[1][i].suit) {
                deadCards.push(hand[1][i].rank + hand[1][i].suit)
            }
        }
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
