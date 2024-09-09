import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
 
    return cart.reduce((total, item) => total + item.quantity * parseFloat(item.cost.replace(/[^0-9.-]+/g,"")), 0);
    
  };


  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.name} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-cost">Cost:{item.cost}</p>
              <div className="cart-item-quantity">
                <button onClick={() => handleIncrement(item)} className="cart-item-button">+</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button onClick={() => handleDecrement(item)} className="cart-item-button">-</button>
              </div>
              <p className="cart-item-total">Subtotal: ${item.quantity *  parseFloat(item.cost.replace(/[^0-9.-]+/g,""))}</p>
              <button onClick={() => handleRemove(item)} className="cart-item-delete">Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="total_cart_amount">Total Amount: ${calculateTotalAmount()}</h3>
      <button onClick={handleContinueShopping} className="get-started-button1">Continue Shopping</button>
      <button onClick={handleCheckoutShopping} className="get-started-button1">Checkout</button>
    </div>
  );
};

export default CartItem;