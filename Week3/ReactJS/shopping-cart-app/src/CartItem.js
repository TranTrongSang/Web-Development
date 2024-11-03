// src/CartItem.js
import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const CartItem = ({ item }) => {
    const { removeFromCart, decreaseQuantity } = useContext(CartContext);

    // Function to handle decrease or remove based on quantity
    const handleDecreaseOrRemove = () => {
        if (item.quantity === 1) {
            removeFromCart(item.id); // Remove item if quantity is 1
        } else {
            decreaseQuantity(item.id); // Decrease quantity if more than 1
        }
    };

    return (
        <li>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={handleDecreaseOrRemove} style={{ marginLeft: '10px' }}>−</button> {/* Minus symbol button */}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </li>
    );
};

export default CartItem;
