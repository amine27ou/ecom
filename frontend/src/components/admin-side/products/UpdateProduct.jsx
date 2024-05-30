import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { axiosClient } from '../../../api/axios'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function UpdateProduct() {
    const [errors,setErrors] = useState({})
    const [loading,setLoading] = useState(false)
    const [formData,setFormData] = useState({})
    const {id} = useParams()
    const handleChange = (e) => {
        const { type, value, name, checked,files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : type==='file' ? files[0] : value 
        }));
    };
    useEffect(()=>{
        const fetchProduct = async()=>{
            const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/products/${id}`)
            setFormData({
                name:response.data.product.name,
                description:response.data.product.description,
                price:response.data.product.price,
                quantity:response.data.product.quantity,
                isAvailable:response.data.product.isAvailable
            })
        }
        fetchProduct()
    },[id])
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            const response = await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/products/${id}`, {...formData,_method:'PUT'}, {
                headers: {
                  'Content-type': 'multipart/form-data',
                },
              });
              if(response.status === 200){
                setLoading(false)
                navigate('/dashboard/products')
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
            <h1 className='text-black font-bold'>Update Product </h1>
            <Link to='/products' className='text-black border border-black p-2 rounded-md'>Back </Link>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col'>
                <label>Name<span className='text-red-600'>*</span>:</label>
                <input onChange={handleChange} type='text' name='name' value={formData.name} placeholder='Product Name' className='bg-gray-300 text-black outline-none p-2 rounded-md'  />
                {errors.name && <p className='text-red-500 mb-4 '>{errors.name}</p>}
            </div>
            <div className='flex flex-col'>
                <label>Description<span className='text-red-600'>*</span>:</label>
                <textarea onChange={handleChange} type='text' name='description' value={formData.description} placeholder='Product Description' className='bg-gray-300 text-black outline-none p-2 rounded-md resize-none'></textarea>
                {errors.description && <p className='text-red-500 mb-4'>{errors.description}</p>}
            </div>
            <div className='flex flex-col'>
                <label>Price<span className='text-red-600'>*</span>:</label>
                <input onChange={handleChange} type='number' name='price' value={formData.price} placeholder='Product Price' className='bg-gray-300 text-black outline-none p-2 rounded-md'  />
                {errors.price && <p className='text-red-500 mb-4'>{errors.price}</p>}
            </div>
            <div className='flex flex-col'>
                <label>Quantity<span className='text-red-600'>*</span>:</label>
                <input onChange={handleChange} type='number' name='quantity' value={formData.quantity} placeholder='Quantity' className='bg-gray-300 text-black outline-none p-2 rounded-md'  />
                {errors.quantity && <p className='text-red-500 mb-4'>{errors.quantity}</p>}
            </div>
            <div className='flex flex-col'>
                <label>Main Image<span className='text-red-600'>*</span>:</label>
                <input onChange={handleChange} type='file' name='main_image'   className='bg-gray-300 text-black outline-none p-2 rounded-md'  />
                {errors.main_image && <p className='text-red-500 mb-4'>{errors.main_image}</p>}
            </div>
            <div className='flex flex-col'>
                <label>Second Image:</label>
                <input onChange={handleChange} type='file' name='second_image' className='bg-gray-300 text-black outline-none p-2 rounded-md'  />
                {errors.second_image && <p className='text-red-500 mb-4'>{errors.second_image}</p>}
            </div>
            <div className='flex flex-col'>
                <label>Third Image:</label>
                <input onChange={handleChange} type='file' name='third_image' className='bg-gray-300 text-black outline-none p-2 rounded-md'  />
                {errors.third_image && <p className='text-red-500 mb-4'>{errors.third_image}</p>}
            </div>
            <div className='flex items-center mt-5'>
                <label htmlFor='isAvailable'>Is Available:</label>
                <input onChange={handleChange} type='checkbox' id='isAvailable' name='isAvailable' checked={formData.isAvailable} className='bg-gray-300 text-black outline-none p-2 rounded-md'  />
            </div>
            <div className='flex gap-2 mt-5'>
                <button className='text-white p-2 bg-black rounded-sm  hover:bg-gray-400 transition-all'>{loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Edit'}</button>
                <button className='border border-black text-black rounded-sm p-2 '>Cancel</button>
            </div>
        </form>
    </div>
  )
}
