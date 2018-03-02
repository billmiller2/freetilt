import * as React from 'react'

export const ClearButton = (props) => {
    if (!props.displayButton) {
        return <div />
    }

    return (
        <button
            className="btn btn-danger margin-top margin-left"
            onClick={props.onClick}>
            Clear
        </button>
    )
}
