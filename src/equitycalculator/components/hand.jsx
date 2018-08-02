import * as React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { HandCard } from './'

export class Hand extends React.Component {
    render() {
        const {
            position,
            onSelect,
            number,
            selectedPosition,
            selectedCard,
            showPlus,
            showMinus,
            increment,
            decrement
        } = this.props

        const addHandTooltip = <Tooltip id="add-tooltip">Add Hand</Tooltip>
        const removeHandTooltip = <Tooltip id="remove-tooltip">Remove Hand</Tooltip>

        return (
            <div>
                <h4>Hand {number}</h4>
                <HandCard
                    rank={position[1].rank}
                    suit={position[1].suit}
                    isSelected={(selectedPosition === number) && (selectedCard === 1)}
                    onSelect={() => onSelect(number, 1)} />
                <HandCard
                    rank={position[2].rank}
                    suit={position[2].suit}
                    isSelected={(selectedPosition === number) && (selectedCard === 2)}
                    onSelect={() => onSelect(number, 2)} />
                {showPlus &&
                    <OverlayTrigger placement="top" overlay={addHandTooltip}>
                        <button className="btn btn-default handCountModifier" onClick={increment}>
                            <span className="glyphicon glyphicon-plus" />
                        </button>
                    </OverlayTrigger>
                }
                {showMinus &&
                    <OverlayTrigger placement="top" overlay={removeHandTooltip}>
                        <button className="btn btn-default handCountModifier" onClick={decrement}>
                            <span className="glyphicon glyphicon-minus" />
                        </button>
                    </OverlayTrigger>
                }
            </div>
        )
    }
}
