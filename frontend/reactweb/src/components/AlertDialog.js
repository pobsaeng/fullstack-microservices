import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AlertDialog = ({ show, onHide, onConfirm, title, message, confirmLabel, cancelLabel }) => {
  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-xs">
      <Modal.Header closeButton style={{ height: '50px' }}>
        <Modal.Title>{title || 'Alert'}</Modal.Title>
      </Modal.Header>
      {/* className='px-3 py-2' */}
      <Modal.Body className='px-3 py-2 fs-6'>{message || 'Something went wrong.'}</Modal.Body>
      <Modal.Footer style={{ height: 'auto', padding: '1px' }}>
        {onConfirm ? (
          <>
            <Button variant="danger" onClick={onConfirm} className="btn btn-sm">
              {confirmLabel}
            </Button>
            <Button variant="secondary" onClick={onHide} className="btn btn-sm">
              {cancelLabel}
            </Button>
          </>
        ) : (
          <div className="d-flex justify-content-between w-100 align-items-center">
            {/* <div className='badge text-bg-danger fs-7'>{statusCode? `Code : ${statusCode}` : ''}</div> */}
            <div></div>
            <Button variant={`${title === 'Error'? 'danger' : 'secondary'}`} onClick={onHide} className="btn btn-sm">
              {cancelLabel}
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AlertDialog;