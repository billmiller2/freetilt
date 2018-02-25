import { connect } from 'react-redux'
import { Board } from '../'

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: () => {
        }
    }
}

export const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)
