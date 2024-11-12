import React, { useState } from "react";
import { useSelector } from "react-redux";
import PosList from "./PosList";
import BottomPanel from "./BottomPanel";
import InputPanel from "./InputPanel";
import ButtonPanel from "./ButtonPanel";
import ShowProductDialog from "./ProductDialog";
import "./pos.css";

const PosIndex = () => {
  const { items } = useSelector((state) => state.pos);
  const [showProduct, setShowProduct] = useState(false);
  const [addOrSaveFlag, setAddOrSaveFlag] = useState(true);
  const [productSelected, setProductSelected] = useState(null);
  const [showMoreAction, setShowMoreAction] = useState({});
  const initialItemState = {
    id: "",
    code: "",
    name: "",
    price: "",
    amount: 1,
    total: 0,
  };
  const [item, setItem] = useState(initialItemState);
  const resetItem = () => {
    setItem(initialItemState);
    setAddOrSaveFlag(true);
  };

  const handleClearTextAndMoreAction = () => {
    setShowMoreAction(() => {
      const newState = {};
      items.forEach((item) => {
        newState[item.id] = false;
      });
      return newState;
    });

    resetItem();
  };

  const handleClose = () => {
    setShowProduct(false);
  };

  return (
    <div className="container">
      <div>
        <ShowProductDialog
          show={showProduct}
          onHide={handleClose}
          setShowProduct={setShowProduct}
          setProductSelected={setProductSelected}
        />
      </div>

      <div className="row mt-4 mb-2 p-0">
        <div className="col-sm-12">
          <InputPanel
            setShowProduct={setShowProduct}
            productSelected={productSelected}
            item={item}
            setItem={setItem}
            handleClearTextAndMoreAction={handleClearTextAndMoreAction}
            setAddOrSaveFlag={setAddOrSaveFlag}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-10">
          <div className="row">
            <div className="col">
              <PosList
                setItem={setItem}
                resetItem={resetItem}
                showMoreAction={showMoreAction}
                setShowMoreAction={setShowMoreAction}
                setAddOrSaveFlag={setAddOrSaveFlag}
              />
            </div>
          </div>

          <div className="row">
            <div className="col ml-0">
              <BottomPanel />
            </div>
          </div>
        </div>

        <div className="col-sm-2" style={{ paddingLeft: "6px" }}>
          <ButtonPanel
            productSelected={productSelected}
            setItem={setItem}
            resetItem={resetItem}
            item={item}
            handleClearTextAndMoreAction={handleClearTextAndMoreAction}
            addOrSaveFlag={addOrSaveFlag}
          />
        </div>
      </div>
    </div>
  );
};

export default PosIndex;
