import React, {  useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import Loading from '../Loading';

export default function Checkout() {
  const [formData, setFormData] = useState({});
  const {user} = useAuthContext()
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    
  }


  return (
    <div>

      <div className="bg-gray-100 p-10 ">
      <h1 className='font-bold '>Your Total is : $200.00</h1>

  {!user || Object.values(user).every(value => value === null || value === undefined || value === '')
? <Loading color='black' /> :<form onSubmit={handleSubmit}>
<div className="mb-4">
  <label htmlFor="first_name" className="block text-gray-700">
    First Name
  </label>
  <input
    type="text"
    id="first_name"
    name="first_name"
    onChange={handleChange}
    placeholder="FIRST NAME*"
    className="border p-2 bg-white resize-none outline-none w-full"
    value={user.first_name}
    disabled
    />
</div>

<div className="mb-4">
  <label htmlFor="last_name" className="block text-gray-700">
    Last Name
  </label>
  <input
    type="text"
    id="last_name"
    name="last_name"
    onChange={handleChange}
    placeholder="LAST NAME*"
    className="border p-2 bg-white resize-none outline-none w-full"
    value={user.last_name}
    disabled
    />
</div>

<div className="mb-4">
  <label htmlFor="email" className="block text-gray-700">
    Email Address
  </label>
  <input
    type="email"
    id="email"
    name="email"
    onChange={handleChange}
    placeholder="EMAIL ADDRESS*"
    className="border p-2 bg-white resize-none outline-none w-full"
    value={user.email}
    disabled
  />
</div>

<div className="mb-4 flex flex-col w-full">
  <label htmlFor="shipping_address" className="block text-gray-700">
    Shipping Address
  </label>
  <textarea
    id="shipping_address"
    name="shipping_address"
    onChange={handleChange}
    className="border p-2 bg-white resize-none outline-none w-full"
    placeholder='Shipping Address'
    ></textarea>
</div>

<input
  type="submit"
  className="bg-yellow-700 p-2 rounded-sm text-white mt-5 cursor-pointer"
  value="Submit"
  />
</form> }
  </div>
  </div>
  );
}
