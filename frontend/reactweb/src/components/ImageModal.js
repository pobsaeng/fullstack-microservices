import React from "react";                                                                             
import { Modal } from "react-bootstrap";                                                                

export const ImageModalComponent = ({ show, handleCloseImgModal, imageUrl, title, description }) => {
  return (
    <Modal show={show} onHide={handleCloseImgModal} centered dialogClassName="modal-md">
      <Modal.Header closeButton style={{ height: '45px' }}>
        <Modal.Title style={{ fontSize: '22px' }}>{title || "Product Image"}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{padding: '1px'}}>
        {imageUrl ? (
          <img src={`/images/${imageUrl}`} alt="Product" style={{ width: "100%" }} />
        ) : (
          <p>No image available</p>
        )}
      </Modal.Body>
      <Modal.Footer className="p-0">
        <div className="row w-100 p-0 m-0">
        <div className='col-10 ps-1 pt-1 fs-7'>{description? `${description}` : ''}</div>
        <div className="col-2 py-1">
        <button className="btn btn-secondary btn-sm rounded-4" onClick={handleCloseImgModal}>
          Close
        </button>
        </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModalComponent;

