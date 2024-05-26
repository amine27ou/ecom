import React from 'react'
import Shoes from '../../assets/shoes.webp'
import Accessories from '../../assets/accessories.webp'
import Tops from '../../assets/tops.webp'
import { Link } from 'react-router-dom'

export default function Categories() {
  return (
    <>
    <h1 className='text-center text-yellow-600 gap-2 hover:gap-5 flex items-center justify-center text-2xl my-10 transition-all'>
        <div className='h-1 w-10 bg-yellow-600'></div>Categories<div className='h-1 w-10 bg-yellow-600'></div></h1>
    <div className='flex flex-col gap-5 items-center md:flex-row'>
        <div className='card relative w-[500px] h-[340px]'>
            <img className='w-full h-full object-cover' src={Shoes} />
            <div className='layer flex items-center justify-center h-full w-full bg-black bg-opacity-50 absolute top-0'>
                <Link to='' className='text-yellow-600 font-bold text-2xl'>Shoes</Link>
            </div>
        </div>
        <div className='card relative w-[500px] h-[340px]'>
            <img className='w-full h-full object-cover' src={Accessories} />
            <div className='layer flex items-center justify-center h-full w-full bg-black bg-opacity-50 absolute top-0'>
                <Link to='' className='text-yellow-600 font-bold text-2xl'>Accessories</Link>
            </div>
        </div>
        <div className='card relative w-[500px] h-[340px]'>
            <img className='w-full h-full object-cover' src={Tops} />
            <div className='layer flex items-center justify-center h-full w-full bg-black bg-opacity-50 absolute top-0'>
                <Link to='' className='text-yellow-600 font-bold text-2xl'>Tops</Link>
            </div>
        </div>
        
    </div>
    </>
  )
}
