import React from 'react';
import Header from './Header';
import cate1 from '../../assets/cate11.jpg';
import cate2 from '../../assets/cate2.jpg';
import { Link } from 'react-router-dom';
import Products from './Products';
import Categories from './Categories';
import Services from './Services';
import Footer from './Footer';

export default function Home() {
  return (
    <div className='p-2'>
      <Header />
      {/* navlinks with photos */}
      <div className=' flex flex-col md:flex-row justify-center items-center mt-20 space-y-4 md:space-y-0 md:space-x-4'>
        <div className='w-full md:w-[600px] relative flex items-center justify-center'>
          <img className='w-full h-auto' src={cate2} alt="Category 2" />
          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <Link to='/story' className='text-white text-6xl font-bold hover:text-yellow-600 transition-all'>Our Story</Link>
          </div>
        </div>
        <div className='w-full md:w-[600px] relative flex items-center justify-center'>
          <img className='w-full h-auto' src={cate1} alt="Category 1" />
          <div className='absolute  overflow-hidden inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <Link to='/blog' className='text-white text-6xl font-bold hover:text-yellow-600 transition-all'>Our Blog</Link>
          </div>
        </div>
      </div>
        <Products/>
        <Categories/>
        <Services/>
    </div>
  );
}
