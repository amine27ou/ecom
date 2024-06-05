import React from 'react'

export default function Checkout() {
  // const {user,getUser} = useAuthContext()
  // const {cart} = useCartContext()
  return (
    <div>
        <div>
          <h1>Shipping Details</h1>
        </div>
        <form className='bg-gray-100 p-10'>
          <div className='flex flex-col w-max'>
            <label>
              First Name:
            </label>
            <input type='text' className='border p-2 bg-white' disabled value='amine'/>
          </div>
          <div className='flex flex-col w-max'>
            <label>
              Last Name:
            </label>
            <input type='text' className='border p-2 bg-white' disabled value='amine'/>
          </div>
        </form>
    </div>
  )
}
