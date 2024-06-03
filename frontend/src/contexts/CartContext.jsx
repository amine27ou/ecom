import React, { useState, createContext, useContext } from 'react';

const CartStateContext = createContext();

export default function CartProvider({ children }) {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart-items')) || []);

    const handleAddProduct = (product) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.some(prod => prod.id === product.id) ? prevCart : [...prevCart, product];
            localStorage.setItem('cart-items', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };
    

    const handleDeleteProduct = (id) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== id));
        localStorage.setItem('cart-items',JSON.stringify(cart))
    };

    return (
        <CartStateContext.Provider value={{ handleAddProduct, handleDeleteProduct, cart }}>
            {children}
        </CartStateContext.Provider>
    );
}

export const useCartContext = () => useContext(CartStateContext);
