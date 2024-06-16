import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import Footer from '../components/client-side/Footer';
import { CiShoppingCart } from 'react-icons/ci';
import { FaUserCircle } from 'react-icons/fa';
import { useAuthContext } from '../contexts/AuthContext';
import { FaChevronLeft } from "react-icons/fa";
import { useCartContext } from '../contexts/CartContext';

export default function ClientLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser,getUser } = useAuthContext();
  const [profileNav, setProfileNav] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const {cart,handleDeleteProduct,setCart} = useCartContext()  

  useEffect(() => {
    getUser()
  }, []);

  return (
    <>
      <div className="flex items-center justify-between p-4 relative">
        <div className="logo flex flex-col items-center space-x-2">
          <img className="w-20" src={Logo} alt="Giovanni Meanswear Logo" />
          <p className="font-bold">Giovanni Meanswear</p>
        </div>
        <div className="navlinks hidden md:flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-yellow-600' : 'text-black')}
          >
            Home
          </NavLink>
          <NavLink
            to="/store"
            className={({ isActive }) => (isActive ? 'text-yellow-600' : 'text-black')}
          >
            Store
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'text-yellow-600' : 'text-black')}
          >
            About
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) => (isActive ? 'text-yellow-600' : 'text-black')}
          >
            Blog
          </NavLink>
          {!user || Object.values(user).every(value => value === null || value === undefined || value === '') ? (
            <NavLink to="/login" className="hover:text-yellow-600">
              Log In
            </NavLink>
          ) : (
            <div className='flex items-center gap-2 relative cursor-pointer' onClick={() => setProfileNav(!profileNav)}>
              <FaUserCircle className="text-2xl" />
              <h1>{user.first_name} {user.last_name}</h1>
              {profileNav && (
                <div className='bg-white border shadow-lg w-[140px] flex flex-col items-start z-30 rounded-md absolute top-10'>
                  {user.role === 'admin' && (
                    <span className='hover:bg-gray-300 p-2 w-full transition-all'>
                      <Link to="/dashboard/stats">Dashboard</Link>
                    </span>
                  )}
                  <span className='hover:bg-gray-300 p-2 w-full transition-all'>
                    <Link to="/profile">Profile</Link>
                  </span>
                  <span className='hover:bg-gray-300 p-2 w-full transition-all'>
                    <button onClick={()=>{
                                          logoutUser()
                                          setCart([])
                                          }}
                                           >Logout</button>
                  </span>
                </div>
              )}
            </div>
          )}
          <span onClick={() => { setCartIsOpen(!cartIsOpen) }}>
            <CiShoppingCart className="text-2xl cursor-pointer" />
          </span>
          <div className={`fixed top-0 bottom-0 h-full ${cartIsOpen ? 'w-[300px] right-0' : 'w-0 -right-[500px]'} z-20 transition-all duration-200 ease-in`}>
            <div className='bg-black p-5 text-white flex items-center gap-10'>
              <FaChevronLeft className='cursor-pointer' onClick={() => { setCartIsOpen(false) }} />
              <h1 className='text-2xl text-center'>Cart</h1>
            </div>
            <div className='overflow-y-scroll bg-white flex flex-col gap-2 shadow-md p-5 h-full'>
              {cart.length > 0  ? cart.map(product=>(
                <div className='flex gap-3 border shadow-sm items-center justify-between flex-row  p-3' >
                  <img  src={
                      product.main_image.includes('product_')
                          ? `${import.meta.env.VITE_BACKEND_URL}storage/products/${product.main_image}`
                          : product.main_image
                      } className='w-[100px] ' />
                      <div>
                        <Link className='font-bold' to={`/products/${product.id}`}>{product.name}</Link>
                        <p className='text-gray-500'>${product.price}.00</p>
                        <button className='underline' onClick={()=>{handleDeleteProduct(product.id)}}>Remove from cart</button>
                      </div>
                      <hr/>
                </div>
              )) 
              : <p>Cart is empty!</p> }
              <div className='bg-white relative left-0 rounded-md p-4  right-0 bottom-5 my-10 shadow-md border flex items-center justify-between flex-row'>
                      <Link className=' w-max bg-yellow-600 text-white p-2 text-center rounded-md' to='/cart'>View Cart</Link>
                      <p>{cart.length} {cart.length > 1 ? 'items' :'item' }</p>
              </div>
            </div>

          </div>
        </div>
        <div
          className="hamburger md:hidden absolute right-4 z-20"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <IoMdClose className="cursor-pointer z-20 text-1xl" />
          ) : (
            <GiHamburgerMenu className="cursor-pointer z-20" />
          )}
        </div>
        {isOpen && (
          <div className="md:hidden bg-white flex flex-col pt-20 fixed shadow-md w-1/2 p-4 top-0 right-0 bottom-0 z-10">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'text-yellow-600' : 'text-black')}
            >
              Home
            </NavLink>
            <NavLink
              to="/store"
              className={({ isActive }) => (isActive ? 'text-yellow-600' : 'text-black')}
            >
              Store
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'text-yellow-600' : 'text-black')}
            >
              About
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) => (isActive ? 'text-yellow-600' : 'text-black')}
            >
              Blog
            </NavLink>
            {!user || Object.values(user).every(value => value === null || value === undefined || value === '') ? (
              <NavLink to="/login" className="hover:text-yellow-600">
                Log In
              </NavLink>
            ) : (
              <div className='flex flex-col'>
                <Link to='/profile' className='flex items-center gap-2'>
                  <FaUserCircle className="text-2xl" />
                  <h1>{user.first_name} {user.last_name}</h1>
                </Link>
                {user.role === 'admin' && (
                  <span>
                    <Link className='hover:text-yellow-600' to="/dashboard">Dashboard</Link>
                  </span>
                )}
                <span>
                  <Link className='hover:text-yellow-600' to="/profile">Profile</Link>
                </span>
                <span>
                  <button className='hover:text-yellow-600' onClick={logoutUser}>Logout</button>
                </span>
              </div>
            )}
            <NavLink to="/cart">
              <CiShoppingCart className="text-2xl cursor-pointer" />
            </NavLink>
          </div>
        )}
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
