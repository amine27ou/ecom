import React, { useState, createContext, useContext } from 'react';

const CartStateContext = createContext();

export default function CartProvider({ children }) {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart-items')) || []);

    const handleAddProduct = (product, quantity) => {
        const updatedProduct = {
            product_id: product.id,
            name: product.name,
            price: product.price,
            second_image: product.second_image,
            third_image: product.third_image,
            main_image: product.main_image,
            description: product.description,
            quantity: quantity,
        };
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex((prod) => prod.product_id === product.id);
            if (existingProductIndex !== -1) {
                prevCart[existingProductIndex].quantity += quantity;
                return [...prevCart];
            } else {
                return [...prevCart, updatedProduct];
            }
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
