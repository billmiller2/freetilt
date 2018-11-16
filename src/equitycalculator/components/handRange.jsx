import React from 'react'

import { Tooltip, OverlayTrigger } from 'react-bootstrap'

export const HandRange = (props) => {
    const {
        showPlus,
        showMinus,
        increment,
        decrement
    } = props

    const addHandTooltip = <Tooltip id="add-tooltip" className="tooltip">Add Hand</Tooltip>
    const removeHandTooltip = <Tooltip id="remove-tooltip" className="tooltip">Remove Hand</Tooltip>

    return (
        <div className="handRangeRow">
            <button className="btn btn-default">
                Hand
            </button>
            <button className="btn btn-default">
                Range
            </button>
            {showMinus &&
                <OverlayTrigger placement="top" overlay={removeHandTooltip}>
                    <button className="btn btn-default handCountModifier" onClick={decrement}>
                        <span className="glyphicon glyphicon-minus" />
                    </button>
                </OverlayTrigger>
            }
            {showPlus &&
                <OverlayTrigger placement="top" overlay={addHandTooltip}>
                    <button className="btn btn-default handCountModifier" onClick={increment}>
                        <span className="glyphicon glyphicon-plus" />
                    </button>
                </OverlayTrigger>
            }
        </div>
    )
}
