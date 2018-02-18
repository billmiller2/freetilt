import * as React from 'react'

export const ClearButton = (props) => {
    if (!props.displayButton) {
        return <div />
    }

    return (
        <button
            className="btn btn-danger" 
            onClick={props.onClick}
            id="clear-btn">
            Clear
        </button>
    )
}
