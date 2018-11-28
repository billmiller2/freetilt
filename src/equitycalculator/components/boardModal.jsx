import React from 'react'
import { Modal } from 'react-bootstrap'

import { CardBankContainer, BoardContainer } from '../'

export const BoardModal = (props) => {
    return (
        <Modal bsSize="small" show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <BoardContainer />
                    <hr />
                    <CardBankContainer />
                </div>
            </Modal.Body>
        </Modal>
    )
}
