import { useSelector } from "react-redux";
import {formatNumber} from "../../../utils/Number";

const BottomPanel = () => {
    const { items } = useSelector((state) => state.pos);

    const totalAmount = () => {
        return items.reduce((accumulator, item) => accumulator + item.amount, 0);
    };
    const totalPrice = () => {
        return items.reduce((accumulator, item) => accumulator + item.total, 0).toFixed(2); // Use toFixed for 2 decimal places
    };

    return (
        <div>
            <div className="text-end pb-1 fs-7">Total Amount: <span className="badge text-bg-dark fs-6"> {totalAmount()}</span></div>
            <div className="text-end fs-7">Total Price: <span className="badge text-bg-dark fs-6">{formatNumber(totalPrice())}</span></div>
        </div>
    );
};

export default BottomPanel;
