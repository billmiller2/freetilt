import React from 'react'
import { Modal } from 'react-bootstrap'

import { CardBankContainer, HandContainer } from '../'

export const HandModal = (props) => {
    const { number } = props

    return (
        <Modal bsSize="small" show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <h4>Hand {number}</h4>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <HandContainer number={number} />
                    <hr />
                    <CardBankContainer />
                </div>
            </Modal.Body>
        </Modal>
    )
}
