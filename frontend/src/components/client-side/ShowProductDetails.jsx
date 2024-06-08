import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { axiosClient } from '../../api/axios';
import Loading from '../Loading';
import { useCartContext } from '../../contexts/CartContext';

export default function ShowProductDetails() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const { handleAddProduct } = useCartContext();
  const { id } = useParams();
  const navigate = useNavigate()
  const fetchProduct = async (id) => {
    try {
      const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/products/${id}`);
      if (response.status === 200) {
        setProduct(response.data.product);
        setSelectedImage(response.data.product.main_image);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError('Error Fetching Product');
    }
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const handleAddToCart = () => {
    handleAddProduct(product, quantity);
  };
  
  const totalAmount = product.price * quantity

  const handleCheckout = (e) => {
    e.preventDefault();
  
    const orderItem = {
      product_id: product.id,
      quantity: quantity,
      price: product.price
    };
  
    navigate('/cart/checkout', { state: { orderItems: [orderItem], total: totalAmount } });
  };
   return (
    <div className='my-5 p-10'>
      {loading ? (
        <Loading color='black' />
      ) : (
        <>
          <div className='mb-10'>
            <Link to='/'>Home/Store/<span className='text-gray-500'>{product.name}</span></Link>
          </div>
          {error ? (
            <h1>{error}</h1>
          ) : (
            <div className='bg-gray-200 p-10 flex items-start justify-center gap-20 flex-row'>
              <div>
                <img src={selectedImage.includes('product_') ? `http://127.0.0.1:8000/storage/products/${selectedImage}` : selectedImage} className='w-[320px]' />
                <div className='flex flex-row p-2 gap-2'>
                  <img src={product.main_image.includes('product_') ? `http://127.0.0.1:8000/storage/products/${product.main_image}` : product.main_image} className='w-[100px] cursor-pointer border' onClick={() => { setSelectedImage(product.main_image) }} />
                  <img src={product.second_image.includes('product_') ? `http://127.0.0.1:8000/storage/products/${product.second_image}` : product.second_image} className='w-[100px] cursor-pointer border' onClick={() => { setSelectedImage(product.second_image) }} />
                  <img src={product.third_image.includes('product_') ? `http://127.0.0.1:8000/storage/products/${product.third_image}` : product.third_image} className='w-[100px] cursor-pointer border' onClick={() => { setSelectedImage(product.third_image) }} />
                </div>
              </div>
              <div className='pt-10 flex flex-col w-1/2'>
                <h1 className='text-2xl font-bold'>{product.name}</h1>
                <p className='text-1xl text-gray-500'>${product.price}.00</p>
                <p>Quantity</p>
                <input
                  type='number'
                  name='quantity'
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className='border border-gray-500 bg-gray-200 outline-none p-2 my-5 w-[50px]'
                  min={1}
                />
                <p>{product.description}</p>
                <button
                  onClick={handleAddToCart}
                  className='bg-yellow-700  text-white p-2 rounded-md outline-none my-2'
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className='bg-black  text-white p-2 rounded-md outline-none my-2'
                >
                  Buy Now
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
