import React from 'react'

import { Tooltip, OverlayTrigger } from 'react-bootstrap'

export const Increment = (props) => {
    const { increment } = props
    const tooltip = <Tooltip id="add-tooltip" className="tooltip">Add Hand</Tooltip>

    return (
        <OverlayTrigger placement="top" overlay={tooltip}>
            <button className="btn btn-default handCountModifier" onClick={increment}>
                <span className="glyphicon glyphicon-plus" />
            </button>
        </OverlayTrigger>
    )
}
