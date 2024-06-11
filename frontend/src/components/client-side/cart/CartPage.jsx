import React, { useState, useEffect } from 'react';
import { useCartContext } from '../../../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { GoTag } from 'react-icons/go';

export default function CartPage() {
  const { cart, handleDeleteProduct } = useCartContext();
  const [localCart, setLocalCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const handleQuantityChange = (product, value) => {
    const newCart = localCart.map((item) =>
      item.product_id === product.product_id ? { ...item, quantity: Number(value) } : item
    );
    setLocalCart(newCart);
    localStorage.setItem('cart-items', JSON.stringify(newCart));
  };

  const calculateSubtotal = () => {
    return localCart.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const orderItems = localCart.map((product) => ({
      product_id: product.product_id,
      quantity: product.quantity,
      price: product.price
    }));
    navigate('/cart/checkout', { state: { orderItems, total: calculateSubtotal() } });
  };

  return (
    <div className='p-10 bg-gray-200'>
      <div>
        <h1 className='text-2xl my-10'>My Cart</h1>
      </div>
      <div className='flex items-start justify-center gap-20'>
        {localCart.length >= 1 ? (
          <div className='flex flex-col gap-5'>
            {localCart.map((product) => (
              <div key={product.product_id} className='flex items-center gap-5'>
                <div className='img-container border'>
                  <img
                    src={
                      product.main_image.includes('product_')
                        ? `${import.meta.env.VITE_BACKEND_URL}storage/products/${product.main_image}`
                        : product.main_image
                    }
                    className='w-[100px] border border-gray-500'
                    alt={product.name}
                  />
                </div>
                <div>
                  <p>{product.name}</p>
                  <p>${(product.price * product.quantity).toFixed(2)}</p>
                </div>
                <input
                  type='number'
                  name='quantity'
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product, e.target.value)}
                  min={1}
                  max={10}
                  className='border border-black bg-gray-200 w-[50px]'
                />
                <MdClose
                  onClick={() => handleDeleteProduct(product.product_id)}
                  className='text-1xl cursor-pointer'
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='flex items-center justify-center flex-col w-full p-10'>
            <h1 className='text-4xl'>Cart is empty</h1>
            <Link to='/' className='underline'>
              Continue Browsing
            </Link>
          </div>
        )}
        {localCart.length >= 1 && (
          <div>
            <h1 className='text-4xl mb-5'>Order Summary</h1>
            <div className='flex gap-5 flex-col'>
              <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
              <p>Total: ${calculateSubtotal().toFixed(2)}</p>
              <button
                onClick={handleCheckout}
                className='p-2 bg-yellow-700 text-white rounded-sm hover:bg-yellow-600 transition-all'
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      {localCart.length >= 1 && (
        <div className='my-10'>
          <h3 className='text-yellow-700 flex items-center gap-3'>
            <GoTag /> Enter a Promo Code
          </h3>
          <input
            type='text'
            className='border outline-none border-yellow-700 p-2 bg-gray-200 placeholder-yellow-700'
            placeholder='Enter a promo code'
          />
          <button className='border-yellow-700 border p-2 text-yellow-700 border-l-0'>Apply</button>
        </div>
      )}
    </div>
  );
}
