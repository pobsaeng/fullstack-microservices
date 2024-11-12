import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../productThunk";
import useAlertDialog from "../../../components/useAlertDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faImage, faRemove } from "@fortawesome/free-solid-svg-icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ImageModalComponent } from "../../../components/ImageModal";

const ProductList = ({ setProductSelected, showModal, showAddModal }) => {
  const { showAlertDialog, alertDialog } = useAlertDialog();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showImgModal, setShowImgModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    return () => {
      dispatch(fetchProducts());
    };
  }, [dispatch]);

  const confirmDelete = (pdID) => {
    if (pdID) {
      dispatch(deleteProduct(pdID));
    }
  };

  const showDeleteDialog = (pdID) => {
    showAlertDialog(
      'Delete Item',
      'Do you want to delete this item?',
      {
        onConfirm: () => { confirmDelete(pdID); },
        onCancel: () => {},
        confirmLabel: 'Yes',
        cancelLabel: 'No',
      }
    );
  };

  const handleEdit = (product) => {
    setProductSelected(product);
    showModal(true);
  };

  const handleShowImgModal = (image, name, description) => {
    setSelectedImage(image);
    setShowImgModal(true);
    setImageName(name);
    setDescription(description);
  };

  const handleImageUrl =(image) => {
    return image.split('/').pop();
  }

  const handleCloseImgModal = () => setShowImgModal(false);

  if (loading) return <div>Loading...</div>;
  
  return (
    <>
      <div className="row">
        <div className="col-4">
        <div className="input-group input-group-sm mb-2">
          <span className="input-group-text">Product</span>
          <input type="text" className="form-control form-control-sm" aria-label="Product name"/>
          <button className="btn btn-outline-secondary">Search</button>
        </div>
        </div>
        <div className="col-8">
          <div className="input-group input-group-sm mb-2 justify-content-end ">
            <button className="btn btn-outline-secondary" onClick={showAddModal}>
              <FontAwesomeIcon icon={faAdd} size="lg"/>
            </button>
          </div>
          </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-sm table-hover table-bordered fw-lighter">
            <thead>
              <tr>
                <th scope="col" className="text-center">ID</th>
                <th scope="col" className="text-center">Code</th>
                <th scope="col" className="text-start">Name</th>
                <th scope="col" className="text-start">Description</th>
                <th scope="col">Active</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col" style={{width: '60px'}}>Image</th>
                <th scope="col" style={{width: '120px'}}>Created At</th>
                <th scope="col" colSpan="2" className="w-auto">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && !isLoggedIn ? (
                ''
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td style={{width: '70px'}} className="text-center">{product.id}</td>
                    <td style={{width: '100px'}} className="text-center">{product.code}</td>
                    <td style={{width: '250px'}}>{product.name}</td>
                    <td>{product.description}</td>
                    <td className="text-center" style={{width: '20px'}}>{product.active ? "Yes": "No"}</td>
                    <td style={{width: '120px'}} className="text-center">{product.price}</td>
                    <td style={{width: '100px'}} className="text-center">{product.stock}</td>
                    <td className="text-center">
                      {product.image ? (
                        <>
                          <FontAwesomeIcon
                            icon={faImage}
                            size="xl"
                            onClick={() => handleShowImgModal(product.image, product.name, product.description)}
                            title="Product Image"
                            style={{ cursor: "pointer" }}
                          />
                        </>
                      ) : (
                        ''
                      )}
                    </td>

                    <td className="text-center">{new Date(product.created_at).toLocaleDateString()}</td>
                    <td colSpan="2" className="text-center">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleEdit(product)}
                      >
                        <FontAwesomeIcon icon={faEdit}/>
                      </button>
                      <span> </span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => showDeleteDialog(product.id)}
                      >
                        <FontAwesomeIcon icon={faRemove} size="lg"/>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Modal Component */}
      {selectedImage && (
        <ImageModalComponent
          show={showImgModal}
          handleCloseImgModal={handleCloseImgModal}
          imageUrl={handleImageUrl(selectedImage)}
          title={imageName}
          description={description}
        />
      )}

      {/* Confirmation Dialog */}
      {alertDialog}
    </>
  );
};

export default ProductList;
