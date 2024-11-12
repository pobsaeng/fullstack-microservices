import React from "react";
import { useSelector } from "react-redux";
import { formatNumber } from "../../../utils/Number";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAlertDialog from "../../../components/useAlertDialog";
import {
  faAlignJustify,
  faEdit,
  faRemove,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteItem } from "../posSlice";
import "./pos.css";

const PosList = ({setItem, resetItem, showMoreAction, setShowMoreAction, setAddOrSaveFlag}) => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.pos);
  const { showAlertDialog, alertDialog } = useAlertDialog();
  
  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
    resetItem();
  };
  
  const onDeleteItem = (id) => {
    showAlertDialog(
      'Delete Item',
      'Do you want to delete this item?',
      {
        onConfirm: () => { handleDeleteItem(id); },
        onCancel: () => {},
        confirmLabel: 'Yes',
        cancelLabel: 'No',
      }
    );
  };

  const handleEditItem = (item) => {
    setItem(item);
    setAddOrSaveFlag(false);
  };

  const handleShowMoreAction = (id) => {
    setShowMoreAction((prevState) => {
      const isCurrentlyShown = prevState[id];
      const newState = {
        ...prevState,
        [id]: !isCurrentlyShown, // Toggle the specific row
      };
  
      // Reset item if the action is now hidden
      if (isCurrentlyShown) {
        resetItem();
      }

      return newState;
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {alertDialog}
      <div className="table-responsive rounded rounded-1">
        {/* <table className="table table-sm table-hover table-borderless border mb-2"> */}
        <table className="table table-sm table-hover mb-2 fw-lighter">
          <thead>
            <tr style={{ borderTop: '1px solid #ebebeb'}}>
              <th scope="col" style={{ width: "38px" }}>No.</th>
              <th scope="col" style={{ width: "130px"}}>Code</th>
              <th scope="col" className="text-start" style={{ width: "auto" }}>Product name</th>
              <th scope="col" className="text-center" style={{ width: "140px" }}>
                Price
              </th>
              <th scope="col" className="text-center" style={{ width: "10%" }}>
                Amount
              </th>
              <th scope="col" className="text-end" style={{ width: "130px" }}>
                Total
              </th>
              <th scope="col" style={{ width: "38px" }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={`${item.id}-${index}`}>
                <th
                  scope="row"
                  className="text-center"
                >
                  <div className="rounded-4 text-bg-secondary fw-lighter">
                    {index + 1}
                  </div>
                </th>
                <td className="text-center fw-lighter" style={{ width: "120px" }}>
                  {item.code}
                </td>
                <td>{item.name}</td>
                <td style={{ width: "130px" }} className="text-center">
                  {formatNumber(Number(item.price))}
                </td>
                <td style={{ width: "100px" }} className="text-center">
                  {item.amount}
                </td>
                {showMoreAction[item.id] ? (
                  <td colSpan="2" className="text-end">
                    {/* Show action buttons if showMoreAction is true */}
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleEditItem(item)}
                    >
                      <FontAwesomeIcon icon={faEdit} size="sm" />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDeleteItem(item.id)}
                    >
                      <FontAwesomeIcon icon={faRemove} size="1x" />
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleShowMoreAction(item.id)}
                    >
                      <FontAwesomeIcon icon={faRightLong} size="sm" />
                    </button>
                  </td>
                ) : (
                  <>
                    <td className="text-end">
                      {formatNumber(Number(item.total))}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleShowMoreAction(item.id)}
                      >
                        <FontAwesomeIcon icon={faAlignJustify} size="sm" />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PosList;
