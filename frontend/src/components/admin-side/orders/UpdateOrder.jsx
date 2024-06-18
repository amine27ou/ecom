import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { axiosClient } from '../../../api/axios'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function UpdateOrder() {
    const [errors,setErrors] = useState({})
    const [loading,setLoading] = useState(false)
    const [formData,setFormData] = useState({})
    const {id} = useParams()
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    useEffect(()=>{
        const fetchOrder = async()=>{
            const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/orders/${id}`)
            setFormData({
                user_id:response.data.order.user_id,
                order_date:response.data.order.order_date,
                status:response.data.order.status,
                total_amount:response.data.order.total_amount,
                shipping_address:response.data.order.shipping_address
            })
        }
        fetchOrder()
    },[id])
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            const response = await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/orders/${id}`, {...formData,_method:'PUT'}, {
                headers: {
                  'Content-type': 'multipart/form-data',
                },
              });
              if(response.status === 200){
                setLoading(false)
                setMessage(response.data.message)
                navigate('/dashboard/orders')
            }
        }
        catch(err){
            setLoading(false)
            if(err.response && err.response.status === 422){
                setErrors(err.response.data.errors)
            }
        }
    }    
    
    return (
    <div>
        <div className='flex items-center justify-between'>
            <h1 className='text-black font-bold'>Update Order </h1>
            <Link to='/dashboard/orders' className='text-black border border-black p-2 rounded-md'>Back </Link>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
            <label>Client Id</label>
            <input 
                onChange={handleChange} 
                type='text' 
                name='name' 
                value={formData.user_id} 
                placeholder='User Id' 
                className='bg-gray-300 text-black outline-none p-2 rounded-md' 
                readOnly 
            />
        </div>
            <div className='flex flex-col'>
                <label>Order Date<span className='text-red-600'>*</span>:</label>
                <input onChange={handleChange} type='date' name='order_date' value={formData.order_date} className='bg-gray-300 text-black outline-none p-2 rounded-md'  />
                {errors.order_date && <p className='text-red-500 mb-4'>{errors.order_date}</p>}
            </div>
            <div className='flex flex-col'>
                <label>Status<span className='text-red-600'>*</span>:</label>
                <select name='status' value={formData.price} className='bg-gray-300 text-black outline-none p-2 rounded-md'>
                    <option value='' selected disabled>Status</option>
                    <option value='Pending'>Pending</option>
                    <option value='Shipped'>Shipped</option>
                    <option value='Delivered'>Delivered</option>
                    <option value='Canceled'>Canceled</option>
                </select>
                {errors.status && <p className='text-red-500 mb-4'>{errors.status}</p>}
            </div>
            <div className='flex flex-col'>
                <label>Total Amount<span className='text-red-600'>*</span>:</label>
                <input onChange={handleChange} type='number' name='total_amount' value={formData.total_amount} placeholder='Total Amount' className='bg-gray-300 text-black outline-none p-2 rounded-md'  />
                {errors.total_amount && <p className='text-red-500 mb-4'>{errors.total_amount}</p>}
            </div>
            <div className='flex flex-col'>
                <label>Shipping Address<span className='text-red-600'>*</span>:</label>
                <input onChange={handleChange} type='text' name='shipping_address' value={formData.shipping_address}  className='bg-gray-300 text-black outline-none p-2 rounded-md'  />
                {errors.shipping_address && <p className='text-red-500 mb-4'>{errors.shipping_address}</p>}
            </div>
            
            
            <div className='flex gap-2 mt-5'>
                <button className='text-white p-2 bg-black rounded-sm  hover:bg-gray-400 transition-all'>{loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Edit'}</button>
                <button className='border border-black text-black rounded-sm p-2 '>Cancel</button>
            </div>
        </form>
    </div>
  )
}
