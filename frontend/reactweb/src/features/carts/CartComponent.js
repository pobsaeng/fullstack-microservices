import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../features/carts/cartSlice';

const CartComponent = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  // Ensure total is a valid number before using toFixed
  const formattedTotal = (Number(total) || 0).toFixed(2); // Default to 0 if total is invalid

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}> {/* Use item.id for unique key */}
            {item.title} - ${item.price}
            <button onClick={() => handleRemoveFromCart(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${formattedTotal}</h3>
    </div>
  );
};

export default CartComponent;
