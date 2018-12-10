import * as React from 'react'

export const EvaluateButton = (props) => {
    const { slots, ranges, savedEquities } = props

    return (
        <button
            className="btn btn-success margin-top"
            disabled={props.disabled}
            id="eval-btn"
            onClick={() => props.saveEquity(slots, ranges, savedEquities)}>
            Evaluate
        </button>
    )
}
