import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Helper function to safely strip '$' and parse price strings into integers
  const parseCost = (costString) => {
    if (typeof costString === 'number') return costString;
    return parseInt(costString.replace('$', ''), 10) || 0;
  };

  // Calculates the combined total dollar value of all unique items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (parseCost(item.cost) * item.quantity), 0);
  };

  // Calculates the absolute total number of items currently inside the basket
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      // Automatically removes the element from Redux when quantity reaches zero
      dispatch(removeItem(item));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculates the cumulative subtotal for a single plant breakdown row
  const calculateTotalCost = (item) => {
    return parseCost(item.cost) * item.quantity;
  };

  const handleCheckoutMessaging = () => {
    alert('Thank you for your order! Checkout feature coming soon.');
  };

  return (
    <div className="cart-container">
      {/* Prominent displays for tracking total summary aggregates */}
      <h2 style={{ color: 'black', marginBottom: '5px' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3 style={{ color: '#555', marginTop: '0px' }}>Total Plants in Cart: {calculateTotalItems()} units</h3>
      
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>
              
              {/* Counter controllers to increase or decrease quantities */}
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              
              {/* Delete Button */}
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue_shopping_btn" style={{ textAlign: 'center', marginTop: '30px' }}>
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutMessaging}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;