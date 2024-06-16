import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { axiosClient } from '../../api/axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ ordersData }) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
        backgroundColor: 'rgb(194, 151, 4,0.5)',
        borderColor: 'rgb(140, 151, 120)',
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
  const [orders, setOrders] = useState([]);
  const [users,setUsers] = useState(null)
  const fetchOrders = async () => {
    try {
      const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/orders`);
      const usersResponse = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/users`);
      if (response.status === 200) {
        setOrders(response.data.orders);
      }
      if (usersResponse.status === 200) {
        setUsers(usersResponse.data.users);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className='flex flex-row items-center justify-center gap-20'>
        <div className='bg-gray-400 p-2 text-white rounded-md w-[200px] flex items-center flex-col justify-center'>
          <h1>Users Count</h1>
          <p className='text-center'>{users && users.length}</p>
        </div>
          <div className='w-full'>
            {orders.length > 0 ? (
              <BarChart ordersData={orders} />
              ) : (
                <p>Loading...</p>
                )}
        </div>
        </div>
    </div>
  );
}
