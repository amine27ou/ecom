import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { axiosClient } from '../../../api/axios'
import Loading from '../../Loading'

export default function ShowProduct() {
    const [loading,setLoading] = useState(true)
    const [product,setProduct] = useState({})
    const [creator,setCreator] = useState()
    const [updater,setUpdater] = useState()
    const [selectedImage,setSelectedImage] = useState()
    const {id} = useParams()
    const fetchProduct = async(id)=>{
        try{
            const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/products/${id}`)
            if(response.status === 200){
                setProduct(response.data.product)
                setCreator(response.data.added_by)
                setUpdater(response.data.updated_by)
                setSelectedImage(response.data.product.main_image)
                setLoading(false)
            }
        }catch(err){
            setLoading(false)
            return <h1>Error Fetching Product</h1>
        }
    }
    useEffect(()=>{
        fetchProduct(id)
    },[id])
  return (
    <div className='p-1'>
    {
        loading ? <Loading color="black" /> : <div >
        <div className='flex gap-2 items-center bg-gray-300 p-4 rounded-md justify-between'>
            <div className='flex gap-2 items-center'>
                <h1 className='text-2xl font-bold'>Product</h1>
                <span className='text-white  rounded-md bg-yellow-600 p-2'>#{product.ref}</span>
            </div>
            <Link to={`/dashboard/products/${id}/edit`} className='text-white bg-yellow-600 p-2 rounded-md'>Update Product</Link>
        </div>
        <div className='md:flex md:flex-row gap-20 p-4 rounded-md bg-gray-300 mt-10'>
            <div className='w-full'>
                <img src={
                    selectedImage.includes('product_')
                        ? `${import.meta.env.VITE_BACKEND_URL}storage/products/${selectedImage}`
                        : selectedImage
                    } className='w-[370px] h-[200px] object-cover object-top'/>
                <div className='flex gap-2 mt-2'>
                    {product.main_image && <img  src={
                                    product.main_image.includes('product_')
                                        ? `${import.meta.env.VITE_BACKEND_URL}storage/products/${product.main_image}`
                                        : product.main_image
                                    } onClick={()=>{setSelectedImage(product.main_image)}} className={`w-[100px] h-[100px] object-cover border  cursor-pointer border-black`}/>}
                    {product.second_image && <img  src={
                                    product.second_image.includes('product_')
                                        ? `${import.meta.env.VITE_BACKEND_URL}storage/products/${product.second_image}`
                                        : product.second_image
                                    } onClick={()=>{setSelectedImage(product.second_image)}} className={'w-[100px] h-[100px] object-cover border  cursor-pointer border-black'}/>}
                    {product.third_image && <img  src={
                                    product.third_image.includes('product_')
                                        ? `${import.meta.env.VITE_BACKEND_URL}storage/products/${product.third_image}`
                                        : product.third_image
                                    } onClick={()=>{setSelectedImage(product.third_image)}} className={'w-[100px] h-[100px] object-cover border cursor-pointer border-black'}/>}
                </div>
            </div>
                <div className='ml-10'>
                    <p className='font-bold'>Name: <span className='text-yellow-700'>{product?.name}</span></p>
                    <p className='font-bold'>Description: <span className='text-yellow-700'>{product?.description}</span></p>
                    <p className='font-bold'>Price: <span className='text-yellow-700'>${product?.price}.00</span></p>
                    <p className='font-bold'>Quantity: <span className='text-yellow-700'>{product?.quantity} pcs</span></p>
                    <p className='font-bold'>Available: <span className='text-yellow-700'>{product?.isAvailable}</span></p>
                    <p className='font-bold'>Created At: <span className='text-yellow-700'>{product?.created_at?.split('T')[0]}</span></p>
                    <p className='font-bold'>Updated At: <span className='text-yellow-700'>{product?.updated_at?.split('T')[0]}</span></p>
                    <p className='font-bold'>Created By: <span className='text-yellow-700'>{creator?.first_name} {creator?.last_name}</span></p>
                    <p className='font-bold'>Updated By: <span className='text-yellow-700'>{updater?.first_name} {updater?.last_name}</span></p>
                </div>
        </div>
    </div>
    }
    </div>
  )
}
