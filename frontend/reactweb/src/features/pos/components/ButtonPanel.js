import { useSelector, useDispatch } from "react-redux";
import { addItem, updateItem, clearItems } from "../posSlice";
import { submitItems } from "../posThunk";
import useAlertDialog from "../../../components/useAlertDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCancel, faEraser, faSatellite, faSave } from "@fortawesome/free-solid-svg-icons";

const ButtonPanel = ({ item, resetItem, handleClearTextAndMoreAction, addOrSaveFlag }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.pos);
  const { showAlertDialog, alertDialog } = useAlertDialog();

  const getValidationErrors = (item) => {
    const errors = [];
    
    if (!item.id || item.id === 0) {
      errors.push("ID is required.");
    }
    if (!item.name || item.name.trim() === "") {
      errors.push("Name is required.");
    }
    if (!item.price || isNaN(item.price) || item.price <= 0) {
      errors.push("Valid price is required.");
    }
    if (!item.amount || isNaN(item.amount) || item.amount <= 0) {
      errors.push("Amount must be a positive number.");
    }
    return errors;
  };
  
  const checkFieldValidate = () => {
    const errorMessages = getValidationErrors(item);
  
    if (errorMessages.length > 0) {
      handleErrorMessage(
        <span>{errorMessages.map((msg, index) => <div key={index}>{msg}</div>)}</span>,
        'Warning'
      );
      return false;
    }
    return true;
  };

  const handleAddOrUpdateProduct = () => {
    if (!checkFieldValidate()) {
      return;
    }

    if (addOrSaveFlag) {
      dispatch(addItem(item));
    } else {
      dispatch(updateItem(item));
    }
    resetItem();
  };

  const handleErrorMessage = (message, title) => {
    showAlertDialog(
      title,
      message,
      {
        cancelLabel: "Close"
      }
    );
};

  const handleSubmit = async () => {
    try {
      if(items.length === 0) { return; }

      const formattedItems = items.map(item => ({
        code: item.code,
        amount: item.amount,
        discount: item.discount || 0,
      }));
      console.log("formattedItems: ", JSON.stringify(formattedItems));
      // Dispatch the action with the formatted payload
      const resultAction = await dispatch(submitItems({ items: formattedItems }));
  
      if (submitItems.rejected.match(resultAction)) {
        if (resultAction.payload) {
          const { status, data } = resultAction.payload;
          handleErrorMessage(`${data.error.toLowerCase()}, status: ${status}`, 'Error');
          return;
        }
      } else {
        dispatch(clearItems());
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };  

  const showHandleCancelDialog = () => {
    if (items.length > 0) {
      showAlertDialog(
        'Delete Item',
        'Do you want to cancel those items?',
        {
          onConfirm: () => { handleCancel(); },
          onCancel: () => {},
          confirmLabel: 'Yes',
          cancelLabel: 'No',
        }
      );
    }
  };

  const handleCancel = () => {
    dispatch(clearItems());
    resetItem();
  };

  return (
    <>
      {alertDialog}
      <div className="d-grid gap-0">
        <button
          type="button"
          className="fw-medium btn btn-outline-primary text-bg-primary btn-md mb-1 rounded rounded-4"
          onClick={handleAddOrUpdateProduct}
        >
          <FontAwesomeIcon icon={addOrSaveFlag ? faAdd : faSave} size="1x" /> {addOrSaveFlag ? "Add" : "Save"}
        </button>

        <button
          type="button"
          className="fw-medium btn btn-outline-secondary text-bg-secondary btn-md mb-4 rounded rounded-4"
          onClick={handleClearTextAndMoreAction}
        >
          <FontAwesomeIcon icon={faEraser} size="1x" /> Clear
        </button>
        <button
          type="button"
          className="fw-medium btn btn-outline-success btn-lg text-bg-success rounded rounded-4 mb-1"
          onClick={handleSubmit}
        >
          <FontAwesomeIcon icon={faSatellite} size="1x" /> Submit
        </button>
        <button
          type="button"
          className="fw-medium btn btn-outline-danger btn-lg text-bg-danger rounded rounded-4"
          onClick={showHandleCancelDialog}
        >
          <FontAwesomeIcon icon={faCancel} size="1x" /> Cancel
        </button>
      </div>
    </>
  );
};

export default ButtonPanel;
