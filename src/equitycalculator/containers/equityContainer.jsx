import { connect } from 'react-redux'
import { Equity, getHandEquity, saveEquity, getHandsFromSlots } from '../'

const mapStateToProps = (state) => {
    const { slots, savedEquities } = state.equityReducer
    let hands = getHandsFromSlots(slots)
    let savedEquity = []

    for (let i = 0; i < savedEquities.length; i++) {
        if (JSON.stringify(savedEquities[i].hands) === JSON.stringify(hands)) {
            savedEquity = savedEquities[i].equities
        }
    }

    const handEquities = savedEquity.length > 0 ? savedEquity : getHandEquity(hands)

    return {
        hands,
        handEquities
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveEquity: (hands, handEquities) => {
            dispatch(saveEquity(hands, handEquities))
        }
    }
}

export const EquityContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Equity)
