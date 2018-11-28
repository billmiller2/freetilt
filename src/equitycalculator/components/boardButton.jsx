import React, { Component } from 'react'

import { BoardModal } from './'

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
        return (
            <div>
                <button className="btn btn-default" onClick={this.toggleBoardModal}>
                    Board
                </button>
                <BoardModal
                    show={this.state.showBoardModal}
                    onClose={this.toggleBoardModal} />
            </div>
        )
    }
}

