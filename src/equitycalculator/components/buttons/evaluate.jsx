import * as React from 'react'

export const EvaluateButton = (props) =>
    <button
        className="btn btn-success margin-top"
        disabled={props.disabled}
        id="eval-btn"
        onClick={() => props.saveEquity(props.slots, props.savedEquities)}>
        Evaluate
    </button>
