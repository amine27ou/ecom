import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import Loading from '../../Loading';
import { axiosClient } from '../../../api/axios';

export default function OrderItems() {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderItems = async () => {
    try {
      const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/order-items`);
      if (response.status === 200) {
        setOrderItems(response.data.order_items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);

  return (
    <div>
      <div className='mt-10'>
        {loading ? (
          <Loading color='black' />
        ) : (
          <div className='flex items-center justify-center'>
            <table className='p-2 shadow-md rounded-md'>
              <thead className='bg-gray-300 text-black '>
                <tr className='p-2 rounded-md'>
                  <th>Order ID</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody className='bg-gray-100 text-black'>
                {orderItems.map((orderItem) => (
                  <tr key={orderItem.id} className='p-2 rounded-md'>
                    <td>{orderItem.order_id}</td>
                    <td>{orderItem.product_id}</td>
                    <td>{orderItem.product.name}</td>
                    <td>{orderItem.quantity}</td>
                    <td>${orderItem.price}</td>
                    <td>${orderItem.price * orderItem.quantity}.00</td>
                    <td>{orderItem.created_at.split('T')[0]}</td>
                    <td>{orderItem.updated_at.split('T')[0]}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
