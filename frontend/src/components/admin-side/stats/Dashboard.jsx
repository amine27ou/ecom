import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { axiosClient } from '../../../api/axios';
import UsersList from './UsersList';
import Loading from '../../Loading'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ ordersData }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const ordersCount = Array.from({ length: 12 }, () => 0);

  ordersData.forEach(order => {
    const monthIndex = new Date(order.order_date).getMonth();
    ordersCount[monthIndex]++;
  });
  
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Number of Orders',
        data: ordersCount,
        backgroundColor: 'rgba(194, 151, 4, 0.5)',
        borderColor: 'rgba(140, 151, 120, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Orders Count',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, 
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default function Dashboard() {
  const [ordersData, setOrdersData] = useState([]);
  const [loading,setLoading] = useState(true)
  const [users, setUsers] = useState(null);
  const [products, setProducts] = useState([]);
  const [orderStats, setOrderStats] = useState({
    pending_orders: 0,
    shipped_orders: 0,
    delivered_orders: 0,
    canceled_orders: 0,
  });

  const fetchData = async () => {
    try {
      const ordersResponse = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/orders`);
      const usersResponse = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/users`);
      const productsResponse = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/products`);

      if (ordersResponse.status === 200) {
        setOrdersData(ordersResponse.data.orders);
        setOrderStats({
          pending_orders: ordersResponse.data.pending_orders,
          shipped_orders: ordersResponse.data.shipped_orders,
          delivered_orders: ordersResponse.data.delivered_orders,
          canceled_orders: ordersResponse.data.canceled_orders,
        });
      }
      if (usersResponse.status === 200) {
        setLoading(false)
        setUsers(usersResponse.data.users);
      }
      if (productsResponse.status === 200) {
        setProducts(productsResponse.data.products);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    {loading ? <Loading color='black'/> :<div>
      <h1 className='font-bold text-2xl'>Store Stats</h1>
      <div className='flex flex-row items-center justify-center gap-20'>
        <div className='flex gap-5 flex-col'>
          <div className='bg-gray-400 p-2 text-white rounded-md w-[200px] flex items-center flex-col justify-center'>
            <h1>Users Count</h1>
            <p className='text-center'>{users && users.length}</p>
          </div>
          <div className='bg-yellow-700 p-2 text-white rounded-md w-[200px] flex items-center flex-col justify-center'>
            <h1>Products Count</h1>
            <p className='text-center'>{products && products.length}</p>
          </div>
          <div className='bg-yellow-400 p-2 text-white rounded-md w-[200px] flex items-center flex-col justify-center'>
            <h1>Pending Orders</h1>
            <p className='text-center'>{orderStats.pending_orders}</p>
          </div>
          <div className='bg-green-400 p-2 text-white rounded-md w-[200px] flex items-center flex-col justify-center'>
            <h1>Shipped Orders</h1>
            <p className='text-center'>{orderStats.shipped_orders}</p>
          </div>
          <div className='bg-blue-400 p-2 text-white rounded-md w-[200px] flex items-center flex-col justify-center'>
            <h1>Delivered Orders</h1>
            <p className='text-center'>{orderStats.delivered_orders}</p>
          </div>
          <div className='bg-red-400 p-2 text-white rounded-md w-[200px] flex items-center flex-col justify-center'>
            <h1>Canceled Orders</h1>
            <p className='text-center'>{orderStats.canceled_orders}</p>
          </div>
        </div>
        <div className='w-full'>
          {ordersData.length > 0 && (
            <BarChart ordersData={ordersData} />
          )}
        </div>
      </div>
      <hr/>
      <h1 className='text-2xl font-bold my-10'>Users List</h1>
      <UsersList/>
    </div>}
    </>
  );
}
