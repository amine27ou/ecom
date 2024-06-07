import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import Loading from '../Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../api/axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Checkout() {
  const [shippingAddress, setShippingAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const { orderItems, total } = location.state;

    const dataToSend = {
      user_id: user.id,
      shipping_address: shippingAddress,
      total_amount: total,
      order_items: orderItems,
    };

    try {
      const response = await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/orders`, dataToSend);
      if (response.status === 200) {
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 p-10 ">
        <h1 className='font-bold '>Your Total is: ${location.state.total}.00</h1>

        {!user || Object.values(user).every(value => value === null || value === undefined || value === '')
          ? <Loading color='black' />
          : <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="first_name" className="block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="FIRST NAME*"
                className="border p-2 bg-white resize-none outline-none w-full"
                value={user.first_name}
                disabled
              />
            </div>

            <div className="mb-4">
              <label htmlFor="last_name" className="block text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="LAST NAME*"
                className="border p-2 bg-white resize-none outline-none w-full"
                value={user.last_name}
                disabled
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="EMAIL ADDRESS*"
                className="border p-2 bg-white resize-none outline-none w-full"
                value={user.email}
                disabled
              />
            </div>

            <div className="mb-4 flex flex-col w-full">
              <label htmlFor="shipping_address" className="block text-gray-700">
                Shipping Address
              </label>
              <textarea
                id="shipping_address"
                name="shipping_address"
                onChange={handleChange}
                className="border p-2 bg-white resize-none outline-none w-full"
                placeholder='Shipping Address'
              ></textarea>
              {errors.shipping_address && <p className="text-red-500">{errors.shipping_address[0]}</p>}
            </div>

            <button 
              type="submit"
              className="bg-yellow-700 p-2 rounded-sm text-white mt-5 cursor-pointer"
            >{loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Submit'}</button>
            {errors.total_amount && <p className="text-red-500">{errors.total_amount[0]}</p>}
            {errors.order_items && <p className="text-red-500">{errors.order_items[0]}</p>}
          </form>
        }
      </div>
    </div>
  );
}
