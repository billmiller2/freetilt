import * as React from 'react'

export const ClearButton = (props) => {
    return (
        <button
            id="clear-btn"
            className="btn btn-danger margin-top margin-left"
            onClick={props.onClick}>
            Clear
        </button>
    )
}
