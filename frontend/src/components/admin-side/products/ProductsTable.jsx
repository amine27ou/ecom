import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../Loading'
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuthContext } from '../../../contexts/AuthContext';

export default function ProductsTable() {
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    const {setMessage} = useAuthContext()
    const fetchProducts = async()=>{
        setLoading(true)
        try{
            const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/products`)
            if(response.status === 200){
                setLoading(false)
                setProducts(response.data.products)
            }
        }catch(err){
            setLoading(false)
        }
    }
    const delProduct = async(e,id)=>{
        e.preventDefault()
        try{
             await axiosClient.delete(`${import.meta.env.VITE_BACKEND_URL}api/products/${id}`).then((res)=>{
                setMessage(res.data.message)
             })

        }catch(err){}
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    return (
    <div>
        <div className='flex  items-center justify-between'>
            <h1 className='text-3xl text-black'>Products</h1>
            <Link to='/dashboard/products/add' className='text-white bg-yellow-600 p-2 rounded-sm'>Add Product</Link>
        </div>
        <div className='mt-10'>
        {loading ? <Loading color='black' /> : 
            <div className='flex items-center justify-center'>
                <table className='p-2 shadow-md rounded-md'>
                    <thead className='bg-gray-300 text-black '>
                        <tr className='p-2 rounded-md'>
                            <td>Image</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Available</td>
                            <td>Created At</td>
                            <td>Updated At</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody className='bg-gray-100 text-black'>
                        {products.map(product=>(
                            <tr className='p-2 rounded-md'>
                            <td>
                                <img
                                    src={
                                    product.main_image.includes('product_')
                                        ? `${import.meta.env.VITE_BACKEND_URL}storage/products/${product.main_image}`
                                        : product.main_image
                                    }
                                    className='w-20'
                                />
                                </td>
                            <td>{product.name}</td>
                            <td>${product.price}.00</td>
                            <td>{product.quantity} pcs</td>
                            <td>{product.isAvailable === 1 ? 'Yes' : 'No'}</td>
                            <td>{product.created_at.split('T')[0]}</td>
                            <td>{product.updated_at.split('T')[0]}</td>
                            <td>
                                <div className='flex items-end  justify-center gap-2'>
                                    <Link className='text-green-400' to={`/dashboard/products/${product.id}`}><FaEye/></Link>
                                    <Link className='text-blue-400' to={`/dashboard/products/${product.id}/edit`}><FaEdit/></Link>
                                    <button onClick={(e) => delProduct(e, product.id)}><MdDelete className='text-red-600' /></button>
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
