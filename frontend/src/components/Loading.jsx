import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Loading({color}) {
  return (
    <div className='flex items-center justify-center'>
        <AiOutlineLoading3Quarters className={`text-6xl text-${color} animate-spin`} />
    </div>
  )
}
