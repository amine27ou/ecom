import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { axiosClient } from '../../api/axios';
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { useCartContext } from '../../contexts/CartContext';


export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [quickView, setQuickView] = useState({
    open: false,
    product: {},
  });
  const [selectedImage,setSelectedImage] = useState('')
  const [loading, setLoading] = useState(true);
  const {handleAddProduct} = useCartContext()

  const fetchProducts = async () => {
    try {
      const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/products`);
      if (response.status === 200) {
        setLoading(false);
        setProducts(response.data.products);
      }
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (quickView.open && quickView.product.main_image) {
      setSelectedImage(quickView.product.main_image);
    }
  }, [quickView]);

  return (
    <>
      {quickView.open && (
        <div className='z-20 fixed pt-[430px] top-0 md:bottom-0 md:left-0 overflow-y-scroll h-full md:right-0 bg-black bg-opacity-35 flex items-center  justify-center'>
          <div className='flex flex-col md:flex-row justify-between bg-white md:p-10 p-20 relative'>
            <IoMdClose className='absolute top-5 right-5 cursor-pointer text-2xl' onClick={() => setQuickView({ open: false, product: {} })} />
            <div>
                <img src={
                    selectedImage.includes('product_')
                        ? `${import.meta.env.VITE_BACKEND_URL}storage/products/${selectedImage}`
                        : selectedImage
                    } alt={quickView.product.name} className='w-[500px] h-[400px] object-cover' />
                <div className='flex gap-2 mt-2'>
                    {quickView.product.main_image && <img  src={
                                    quickView.product.main_image.includes('product_')
                                        ? `${import.meta.env.VITE_BACKEND_URL}storage/products/${quickView.product.main_image}`
                                        : quickView.product.main_image
                                    } onClick={()=>{setSelectedImage(quickView.product.main_image)}} className={`w-[100px] h-[100px] object-cover border  cursor-pointer border-black`}/>}
                    {quickView.product.second_image && <img  src={
                                    quickView.product.second_image.includes('product_')
                                        ? `${import.meta.env.VITE_BACKEND_URL}storage/products/${quickView.product.second_image}`
                                        : quickView.product.second_image
                                    } onClick={()=>{setSelectedImage(quickView.product.second_image)}} className={'w-[100px] h-[100px] object-cover border  cursor-pointer border-black'}/>}
                    {quickView.product.third_image && <img  src={
                                    quickView.product.third_image.includes('product_')
                                        ? `${import.meta.env.VITE_BACKEND_URL}storage/products/${quickView.product.third_image}`
                                        : quickView.product.third_image
                                    } onClick={()=>{setSelectedImage(quickView.product.third_image)}} className={'w-[100px] h-[100px] object-cover border cursor-pointer border-black'}/>}
                </div>
            </div>
            <div className='p-6 flex flex-col'>
                <h2 className='mt-2 text-3xl font-bold'>{quickView.product.name}</h2>
                <p className='mt-2 text-gray-500'>${quickView.product.price}.00</p>
                <p className='mt-2'>REF:<span className='text-gray-500'>{quickView.product.ref}</span></p>
                <label className='mt-2'>Quantity</label>
                <input type='number' name='quantity' className='border outline-none p-2 my-5 w-[50px]' />
                <p>{quickView.product.description}</p>
                <button onClick={()=>{handleAddProduct(quickView.product)}} className='bg-yellow-600 w-1/3 text-white p-2 rounded-md outline-none my-2'>Add to Cart</button>
                <Link className='underline' to={`/product/${quickView?.product.id}`}>view more details</Link>

            </div>
          </div>
        </div>
      )}
      <h1 className='font-bold text-3xl text-center my-10 hover:text-yellow-600
      hover:-translate-y-2 transition-all cursor-pointer'>Our Products</h1>
      {window.innerWidth < 700 ? 
        <div className='bg-gray-200 p-10 grid grid-cols-2 gap-5 my-20'>
          
          {products.map((product) => (
              <div className='product w-[200px] h-[210px] p-5 bg-white flex items-center justify-center flex-col'>
                <Link to={`/products/${product.id}`}>
                  <div className='img-container '>
                    <img
                      src={
                        product?.main_image?.includes('product_')
                          ? `http://127.0.0.1:8000/storage/products/${product.main_image}`
                          : product.main_image
                      }
                      className='w-[200px]'
                      alt={product.name}
                    />
                    <div
                      className='quick-view '
                      onClick={(e) => {
                        e.preventDefault();
                        setQuickView({ open: true, product });

                    }}
                    >
                      <p>Quick View</p>
                    </div>
                  </div>
                </Link>
                <div className='md:mt-5 p-2'>
                  <p>{product.name}</p>
                  <p className='text-center text-gray-500'>${product.price}.00</p>
                </div>
              </div>
          ))
        }
        </div>
      : <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={ 4}
        navigation
        pagination={{ clickable: true }}
        className='bg-gray-200 p-10 mt-10'
      >
        {loading ? (
          <Loading />
        ) : (
          products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className='product w-[200px]  p-5 md:p-[25px] bg-white flex items-center justify-center flex-col'>
                <Link to={`/products/${product.id}`}>
                  <div className='img-container'>
                    <img
                      src={
                        product?.main_image?.includes('product_')
                          ? `http://127.0.0.1:8000/storage/products/${product.main_image}`
                          : product.main_image
                      }
                      className='w-[200px]'
                      alt={product.name}
                    />
                    <div
                      className='quick-view '
                      onClick={(e) => {
                        e.preventDefault();
                        setQuickView({ open: true, product });

                    }}
                    >
                      <p>Quick View</p>
                    </div>
                  </div>
                </Link>
                <div className='md:mt-5 p-2'>
                  <p>{product.name}</p>
                  <p className='text-center text-gray-500'>${product.price}.00</p>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>}
    </>
  );
}
