import React from 'react'
import { Modal } from 'react-bootstrap'

export const RangeModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <h4>Range</h4>
            </Modal.Body>
        </Modal>
    )
}
