// src/Cart.js
import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import CartItem from './CartItem';

const Cart = () => {
    const { cart, total } = useContext(CartContext);

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            {cart.length === 0 ? (
                <p>The cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </ul>
                    <h3>Total: ${total.toFixed(2)}</h3>
                </>
            )}
        </div>
    );
};

export default Cart;
