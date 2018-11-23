import React from 'react'
import { Modal } from 'react-bootstrap'

import { CardBankContainer } from '../'

export const HandModal = (props) => {
    return (
        <Modal bsSize="small" show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <CardBankContainer />
                </div>
            </Modal.Body>
        </Modal>
    )
}
