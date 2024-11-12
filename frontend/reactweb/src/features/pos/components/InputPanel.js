import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faDollar } from "@fortawesome/free-solid-svg-icons";

const InputPanel = ({ setShowProduct, productSelected, item, setItem, handleClearTextAndMoreAction, setAddOrSaveFlag }) => {
  useEffect(() => {
    if (productSelected) {
      setItem({
        id: productSelected.id || "",
        code: productSelected.code || "",
        name: productSelected.name || "",
        price: productSelected.price || 0,
        amount: productSelected.amount || 1,
        total: productSelected.total || 0,
      });
    }
  }, [productSelected, setItem]);

  const handleShowProduct = async (e) => {
    setShowProduct(true);
    handleClearTextAndMoreAction();
    setAddOrSaveFlag(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => {
      const newAmount =
        name === "amount" ? Math.max(0, Number(value) || 1) : prevItem.amount; // Set new amount only if name is "amount"
      const newTotal = newAmount * parseFloat(prevItem.price || 0); // Calculate total based on the new amount

      return {
        ...prevItem,
        [name]: name === "amount" ? newAmount : value, // Update the specific field
        total: newTotal,
      };
    });
  };

  return (
    <div className="input-group input-group-sm mb-2">
      <span className="input-group-text">Product ID:</span>
      <input
        type="text"
        name="id"
        className="form-control fw-lighter w-80"
        value={item.id}
        onChange={handleChange}
        readOnly
      />
      <input type="text" hidden className="form-control" defaultValue={item.code} />
      <span
        className="input-group-text text-bg-primary"
        onClick={handleShowProduct}
      >
        <FontAwesomeIcon icon={faCartShopping} size="1x" />
      </span>
      <input
        type="text"
        name="name"
        className="form-control fw-lighter"
        style={{ width: "20%" }}
        placeholder=""
        defaultValue={item.name}
        disabled
      />
      <span className="input-group-text">Amount:</span>
      <input
        type="number"
        name="amount"
        className="form-control fw-lighter"
        value={item.amount}
        onChange={handleChange}
        min="1"
        step="1"
      />
      <span className="input-group-text">
        <FontAwesomeIcon icon={faDollar} size="sm" />
        Price:
      </span>
      <input
        type="text"
        name="price"
        className="form-control text-bg-dark"
        defaultValue={item.price}
        readOnly
      />
    </div>
  );
};

export default InputPanel;
