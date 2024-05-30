import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../api/axios'
import Loading from '../../Loading'
import { Link } from 'react-router-dom'
import { FaEdit, FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

export default function Orders() {
    const [orders,setOrders] = useState([])
    const [loading,setLoading] = useState(true)
    const fetchOrders = async()=>{
        try{
            const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/orders`)
            if(response.status === 200){
                setLoading(false)
                setOrders(response.data.orders)
            }
        }
        catch(err){
            setLoading(false)
            return <h1>Error fetching orders</h1>
        }
    }
    const delOrder = async(e,id)=>{
        e.preventDefault()
        try{
             await axiosClient.delete(`${import.meta.env.VITE_BACKEND_URL}api/orders/${id}`)
            
        }catch(err){}
    }

    useEffect(()=>{
        fetchOrders()
    },[])
  return (
    <div>
        <div>
            <h1 className='text-3xl font-bold'>Orders</h1>
        </div>
        <div className='mt-10'>
        {loading ? <Loading color='black' /> : 
            <div className='flex items-center justify-center'>
                <table className='p-2 shadow-md rounded-md'>
                    <thead className='bg-gray-300 text-black '>
                        <tr className='p-2 rounded-md'>
                            <th>Client Id</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Total Amount</th>
                            <th>Shipping Address</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-gray-100 text-black'>
                        {orders.map(order=>(
                            <tr className='p-2 rounded-md'>
                            
                            <td>{order.user_id}</td>
                            <td>{order.order_date}</td>
                            <td>{order.status}</td>
                            <td>${order.total_amount}.00</td>
                            <td>{order.shipping_address}</td>
                            <td>{order.created_at.split('T')[0]}</td>
                            <td>{order.updated_at.split('T')[0]}</td>
                            <td>
                                <div className='flex items-end  justify-center gap-2'>
                                    <Link className='text-green-400' to={`/dashboard/orders/${order.id}`}><FaEye/></Link>
                                    <Link className='text-blue-400' to={`/dashboard/orders/${order.id}/edit`}><FaEdit/></Link>
                                    <button onClick={(e) => delOrder(e, order.id)}><MdDelete className='text-red-600' /></button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        }
        </div>
    </div>
  )
}
