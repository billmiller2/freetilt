import React, { Component } from 'react'

import { BoardModal } from './'
import { getSuitFromHTML } from '../'

export class BoardButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showBoardModal: false
        }

        this.toggleBoardModal = this.toggleBoardModal.bind(this)
    }

    toggleBoardModal() {
        this.setState({
            showBoardModal: !this.state.showBoardModal
        })
    }

    render() {
        const { board } = this.props

        return (
            <div>
                <button className="btn btn-default" onClick={this.toggleBoardModal}>
                    Board
                </button>
                &nbsp;
                {Object.values(board).map((card, i) => {
                    const suit = getSuitFromHTML(card.suit.charCodeAt())
                    return (
                        <span key={i} className={suit}>
                            {card.rank + card.suit}
                        </span>
                    )
                })}
                <BoardModal
                    show={this.state.showBoardModal}
                    onClose={this.toggleBoardModal} />
            </div>
        )
    }
}

