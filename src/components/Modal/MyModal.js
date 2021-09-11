import Modal from 'react-bootstrap/Modal'
import React from 'react'

function MyModal(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <i className="fas fa-window-close fa-2x cursorPointer"
                    style={{ position: 'absolute', right: '0', top: '0' }}
                    onClick={() => props.onHide(false)}></i>

                <h2 className='text-center'>Error</h2>
            </Modal.Header>
            <Modal.Body>
                {props.headlineBody}
            </Modal.Body>
        </Modal >
    );
}
export default MyModal