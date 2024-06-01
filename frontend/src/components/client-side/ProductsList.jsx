import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { axiosClient } from '../../api/axios';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [quickView, setQuickView] = useState({
    open: false,
    product: {},
  });
  const [selectedImage,setSelectedImage] = useState('')
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/products`);
      if (response.status === 200) {
        setLoading(false);
        setProducts(response.data.products);
      }
    } catch (err) {
      console.error(err);
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
        <div className='z-20 fixed  top-0 bottom-0 left-0 right-0 bg-black bg-opacity-35 flex items-center justify-center'>
          <div className='flex  justify-between bg-white p-10 relative'>
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
                <button className='bg-yellow-600 text-white p-2 rounded-md outline-none my-2'>Add to Cart</button>
                <Link className='underline' to={`/product/${quickView?.product.id}`}>view more details</Link>

            </div>
          </div>
        </div>
      )}
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        className='bg-gray-200 p-10 mt-10'
      >
        {loading ? (
          <Loading />
        ) : (
          products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className='product p-5 bg-white flex items-center justify-center flex-col'>
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
                      className='quick-view'
                      onClick={(e) => {
                        e.preventDefault();
                        setQuickView({ open: true, product });

                    }}
                    >
                      <p>Quick View</p>
                    </div>
                  </div>
                </Link>
                <div className='mt-5'>
                  <p>{product.name}</p>
                  <p className='text-center'>${product.price}.00</p>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
}
