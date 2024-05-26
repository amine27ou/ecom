import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import Footer from '../components/client-side/Footer';
import { CiShoppingCart } from 'react-icons/ci';
import { FaUserCircle } from 'react-icons/fa';
import { useAuthContext } from '../contexts/AuthContext';

export default function ClientLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, getUser,logoutUser } = useAuthContext();
  const [profileNav, setProfileNav] = useState(false);
  

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between p-4 relative">
        <div className="logo flex items-center flex-col space-x-2">
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
          {!user && (
            <NavLink to="/login" className="hover:text-yellow-600">
              Log In
            </NavLink>
          )}
          {user.role ==='client' ? (
            <div className='flex items-center flex-row gap-2 relative cursor-pointer' onClick={() => setProfileNav(!profileNav)}>
              <FaUserCircle className="text-2xl" />
              <h1>{user.first_name} {user.last_name}</h1>
              {profileNav && (
                <div className='bg-white border shadow-lg h-max w-[140px] flex flex-col items-start z-30 rounded-md absolute top-10'>
                  <span className='hover:bg-gray-300 p-2 w-full transition-all'>
                    <Link to="/profile">Profile</Link>
                  </span>
                  <span className='hover:bg-gray-300 p-2 w-full transition-all'>
                    <button onClick={logoutUser}>Logout</button>
                  </span>
                </div>
              )}
            </div>
          )  : user.role==='admin' ? <div className='flex items-center flex-row gap-2 relative cursor-pointer' onClick={() => setProfileNav(!profileNav)}>
          <FaUserCircle className="text-2xl" />
          <h1>{user.first_name} {user.last_name}</h1>
          {profileNav && (
            <div className='bg-white border shadow-lg h-max w-[140px] flex flex-col items-start z-30 rounded-md absolute top-10'>
              <span className='hover:bg-gray-300 p-2 w-full transition-all'>
                <Link to="/dashboard">Dashboard</Link>
              </span>
              <span className='hover:bg-gray-300 p-2 w-full transition-all'>
                <Link to="/profile">Profile</Link>
              </span>
              <span className='hover:bg-gray-300 p-2 w-full transition-all'>
                <button onClick={logoutUser}>Logout</button>
              </span>
            </div>
          )}
        </div>: <Link to='/login'>Login</Link>}
          <NavLink to="/cart">
            <CiShoppingCart className="text-2xl" />
          </NavLink>
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
          <div className="bg-white flex flex-col pt-20 fixed shadow-md w-1/2 p-4 top-0 right-0 bottom-0 z-10">
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
            {user ? (
              <>
                <h1>{user.first_name} {user.last_name}</h1>
                <button onClick={logoutUser} className="hover:text-yellow-600">
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="hover:text-yellow-600">
                Log In
              </NavLink>
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
