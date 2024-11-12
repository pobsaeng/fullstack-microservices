import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, updateProduct } from "../productThunk";
import { Modal } from "react-bootstrap";
import { InputField, TextAreaField, FileInputField, CheckboxField, DropdownField, InputButton } from "../../../components/UIComponent";

const ProductModal = ({
  showModal,
  handleClose,
  productSelected,
  handleClear,
  setAlertMessage,
  setShowAlert,
}) => {
  const dispatch = useDispatch();
  const initialProduct = {
    id: null,
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
    category_id: 1,
    supplier_id: 1,
  };

  const { loading } = useSelector(state => state.product);
  const [product, setProduct] = useState(initialProduct);
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState({
    category_id: product.category_id || 1,
    supplier_id: product.supplier_id || 1,
  });

  useEffect(() => {
    if (productSelected) {
      setProduct({
        ...productSelected,
        category_id: productSelected.category_id || 1,
        supplier_id: productSelected.supplier_id || 1,
      });

      setFormData({
        category_id: productSelected.category_id || 1,
        supplier_id: productSelected.supplier_id || 1,
      });

      setFileName(productSelected.image);
    } else {

      // setProduct(initialProduct);
      setFormData({
        category_id: 1,
        supplier_id: 1,
      });
    }
  }, [productSelected]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productSelected) {
      handleUpdateProduct();

    } else {
      handleCreateProduct();
    }
  };

  const handleUpdateProduct = async () => {
    const { created_at, updated_at, stock, ...productData } = product;
    const updateProductData = {
        ...productData,
        stock: parseInt(stock),
        updated_by: "Admin",
    };

    const additionalFields = {
        category_id: parseInt(formData.category_id, 10) || 1,
        supplier_id: parseInt(formData.supplier_id, 10) || 1,
    };

    const updateData = {
        ...updateProductData,
        ...additionalFields,
    };

    const resultAction = await dispatch(updateProduct(updateData));
    handleResponse(resultAction, "update");
  };

  const handleCreateProduct = async () => {
    const { id, created_at, updated_at, updated_by, stock, ...productData } = product;
    const createProductData = {
        ...productData,
        stock: parseInt(stock),
        created_by: "Admin",
        updated_by: "Admin",
    };

    const additionalFields = {
        category_id: parseInt(formData.category_id) || 1, 
        supplier_id: parseInt(formData.supplier_id) || 1,
    };

    const createData = {
        ...createProductData,
        ...additionalFields,
    };
    console.log("createData: ", createData);
    const resultAction = await dispatch(createProduct(createData));
    handleResponse(resultAction, "create");
  };

  const handleResponse = (resultAct, actionType) => {
    if (resultAct.type.endsWith('rejected')) {
      setAlertMessage(resultAct.payload || `Something went wrong while ${actionType}ing the product`);
      setShowAlert(true);
      
    } else {
      console.log(`Product ${actionType}d successfully:`, resultAct.payload);
      dispatch(fetchProducts());
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [id]: value || "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file.name });
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleCheckboxChange = (e) => {
    setProduct({ ...product, active: e.target.checked });
  };

  const handleDropdownChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };


  const categoryOptions = [
    { value: 1, label: 'Category 1' },
    { value: 2, label: 'Category 2' },
    { value: 3, label: 'Category 3' },
  ];

  const supplierOptions = [
    { value: 1, label: 'Supplier 1' },
    { value: 2, label: 'Supplier 2' },
    { value: 3, label: 'Supplier 3' },
  ];

  return (
    <Modal show={showModal} onHide={handleClose} centered dialogClassName="modal-lg">
      <Modal.Header closeButton style={{ height: '3vw', backgroundColor: '#f2f4f6' }}>
        <Modal.Title className="h5 px-2 rounded">
          {productSelected ? "Update" : "Add"} Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="lighter-text">
        <form onSubmit={handleSubmit}>
          <InputField label="Code" id="code" value={product.code} onChange={handleInputChange} />
          <InputField label="Name" id="name" value={product.name} onChange={handleInputChange} />
          <TextAreaField label="Description" id="description" value={product.description} onChange={handleInputChange} />
          <InputField label="Price" id="price" type="number" value={product.price} onChange={handleInputChange} />
          <InputField label="Stock" id="stock" type="number" value={product.stock} onChange={handleInputChange} />
          <InputField label="Weight" id="weight" type="number" value={product.weight} onChange={handleInputChange} />
          <InputField label="Brand" id="brand" value={product.brand} onChange={handleInputChange} />
          <InputField label="Color" id="color" value={product.color} onChange={handleInputChange} />
          <InputField label="Size" id="size" type="number" value={product.size} onChange={handleInputChange} />
          <InputField label="Length" id="length" type="number" value={product.length} onChange={handleInputChange} />
          <InputField label="Width" id="width" type="number" value={product.width} onChange={handleInputChange} />
          <InputField label="Height" id="height" type="number" value={product.height} onChange={handleInputChange} />
          <FileInputField label="Image" id="image" onChange={handleImageChange} fileName={fileName} />
          <DropdownField
            label="Category"
            id="category_id"
            value={formData.category_id}
            onChange={handleDropdownChange}
            options={categoryOptions}
          />
          <DropdownField
            label="Supplier"
            id="supplier_id"
            value={formData.supplier_id}
            onChange={handleDropdownChange}
            options={supplierOptions}
          />
          <CheckboxField label="Active" id="active" checked={product.active} onChange={handleCheckboxChange} />
        </form>
      </Modal.Body>
      <Modal.Footer style={{ height: '3vw', paddingTop: '0px', paddingBottom: '0px', backgroundColor: '#f2f4f4' }}>
      <InputButton label={productSelected ? "Update" : "Add"} 
        type="submit" 
        className="btn-outline-success rounded-4" 
        disabled={loading} 
        onClick={handleSubmit} />
        <InputButton label="Clear" type="button" className="btn-outline-secondary rounded-4" onClick={handleClear} />
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
