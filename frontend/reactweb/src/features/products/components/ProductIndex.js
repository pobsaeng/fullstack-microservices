import React, {useState} from "react";
import { useSelector } from "react-redux";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import AlertDialog from "../../../components/AlertDialog";

const ProductIndex = () => {
  const [showModal, setShowModal] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const [showError, setShowError] = useState(false);
  const error = useSelector((state) => state.product.error);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleOpen = () => setShowModal(true);
  const handleOpenAddModal = (product = null) => {
    setProductSelected(null); // null = 'Update', {} = 'Add'
    setShowModal(true);
  };

  // Close the modal and reset selected product
  const handleCloseModal = () => {
    setShowModal(false);
    setProductSelected(null);
  };

  const handleClear = () => {
    if(!productSelected) {
      setProductSelected(null);
      return;
    }
    
    setProductSelected({id: null,
      code: "",
      name: "",
      description: "",
      active: true,
      price: "",
      stock: 0,
      weight: "",
      brand: "",
      color: "",
      size: "",
      length: "",
      width: "",
      height: "",
      image: "",
    });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="container">
      <div className="mt-4 mb-1">
        <AlertDialog
          show={showAlert}
          onHide={handleCloseAlert}
          title={`Error`}
          message={alertMessage}
          cancelLabel={`Close`}
        />
      </div>
      {showError && (
        <div
          className={`container mt-1 ${
            error ? "alert alert-danger" : ""
          } fixed-top`}
        >
          {error}
        </div>
      )}

      <ProductForm
        showModal={showModal}
        productSelected={productSelected}
        handleClear={handleClear}
        handleClose={handleCloseModal}
        setAlertMessage={setAlertMessage}
        setShowAlert={setShowAlert}
      />

      {isLoggedIn? (
          <ProductList
            setProductSelected={setProductSelected}
            showModal={handleOpen}
            showAddModal={handleOpenAddModal}
          />
      ) : ''}
      
    </div>
  );
};

export default ProductIndex;
