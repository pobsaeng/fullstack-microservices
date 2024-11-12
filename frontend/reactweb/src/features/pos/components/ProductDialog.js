import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../products/productThunk";
import { Modal, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./pos.css";

const ShowProductDialog = ({ show, onHide, setShowProduct, setProductSelected, currentAmount }) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const calculateTotal = (price, amount) =>{
     return amount * price;
  }

  const handleGetProduct = (product) => {
     const amount = currentAmount;
     setProductSelected({
          id: product.id,
          code: product.code,
          name: product.name,
          price: product.price,
          amount: 1,
          total: calculateTotal(product.price, amount),
     });
     setShowProduct(false);
   };
   
  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-lg">
      <Modal.Header className="border border-0" closeButton style={{ height: '3vw'}}>
        <Modal.Title className="h5">Product List.</Modal.Title>
      </Modal.Header>
      <Modal.Body className="m-0 py-0 px-2">
        {loading ? (
          <div>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
          <div className="input-group input-group-sm mb-3 p-0">
            <span className="input-group-text">Product name:</span>
            <input type="text" className="form-control" aria-label="Label" aria-describedby="inputLabel"/>
            <button className="btn btn-primary" type="button" id="inputButton">
              <FontAwesomeIcon icon={faSearch} className="1x"/>
            </button>
          </div>

          <table className="table table-sm table-hover border border-1 fw-lighter">
              <thead>
                <tr style={{ height: '0px' }}>
                  <th className="text-start">No</th>
                  <th className="text-start">Code</th>
                  <th className="text-start">Name</th>
                  <th className="text-start">Price</th>
                  <th className="text-start">Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className="p-0 m-0">
                    <td style={{width: '80px'}}>{index + 1}</td>
                    <td style={{width: '90px'}}>{product.code}</td>
                    <td>{product.name}</td>
                    <td style={{width: '90px'}}>{product.price}</td>
                    <td style={{width: '90px'}}>{product.stock}</td>
                    <td>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleGetProduct(product)}
                      >
                        <FontAwesomeIcon icon={faArrowAltCircleDown} className="1x"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </>
        )}
      </Modal.Body>
      <Modal.Footer className="p-0 m-0 border border-0">
        {/* <button type="button" className="btn btn-outline-danger btn-sm">
          <FontAwesomeIcon icon={faClose} size="lg" />
        </button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ShowProductDialog;
