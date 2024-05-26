import React from 'react'
import { TfiReload } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { CiUmbrella } from "react-icons/ci";

export default function Services() {
  return (
    <div className='flex items-center gap-20 flex-col md:flex-row w-full md:justify-between bg-gray-100 p-10 md:p-20 mt-10'>
        <div className='flex items-center flex-col'>
            <TfiReload className='text-4xl'/>
            <p>Free Shipping and Returns</p>
        </div>
        <div className='flex items-center flex-col'>
            <CiLock className='text-4xl'/>
            <p>Secured Payments</p>
        </div>
        <div className='flex items-center flex-col'>
            <CiUmbrella className='text-4xl'/>
            <p>Customer Service</p>
        </div>
    </div>
  )
}
