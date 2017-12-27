import { connect } from 'react-redux'
import { Cards, selectCard } from '../'

const mapStateToProps = (state) => {
    return {}
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
