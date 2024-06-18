import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import Logo from '../assets/logo.png';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

export default function AdminLayout() {
  const [profileNav, setProfileNav] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { user, logoutUser, getUser,setMessage,message } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      await getUser();
      if(!user){
        await getUser()
      }
      else if (user && user.role !== 'admin') {
        navigate('/');
      } else if (user === null) {
        navigate('/');
      }
    };

      checkUser();
  }, [navigate]);
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row h-screen">
      <div className={`sidebar bg-white shadow-inner ${isOpen ? 'left-0' : '-left-[300px]'} w-[200px] flex flex-col items-center py-4 fixed left-0 top-0 bottom-0 transition-all`}>
        <Link to='/'><img src={Logo} alt="Logo" className="w-20 mb-4" /></Link>
      <nav className='flex flex-col mt-10 gap-5'>
      <NavLink
        to='/dashboard/stats'
        className={({ isActive }) => 
          `text-black hover:text-gray-500 w-full  ${isActive ? 'text-yellow-600' : ''}`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to='/dashboard/products'
        className={({ isActive }) => 
          `text-black hover:text-gray-500 ${isActive ? 'text-yellow-600' : ''}`
        }
      >
        Products
      </NavLink>
      <NavLink
        to='/dashboard/orders'
        className={({ isActive }) => 
          `text-black hover:text-gray-500 ${isActive ? 'text-yellow-600' : ''}`
        }
      >
        Orders
      </NavLink>
      <NavLink
        to='/dashboard/posts'
        className={({ isActive }) => 
          `text-black hover:text-gray-500 ${isActive ? 'text-yellow-600' : ''}`
        }
      >
        Posts
      </NavLink>
      <NavLink
        to='/dashboard/order-items'
        className={({ isActive }) => 
          `text-black hover:text-gray-500 ${isActive ? 'text-yellow-600' : ''}`
        }
      >
        Order Items
      </NavLink>
    </nav>
      </div>
      <div className="flex-grow ml-[200px]">
        <div className={`navbar shadow-sm bg-white ${isOpen ? 'left-[200px]' : 'left-0'} transition-all text-black p-4 flex items-center justify-between fixed top-0 right-0 z-10`}>
          {isOpen ? (
            <IoMdClose className='text-2xl cursor-pointer text-black' onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <GiHamburgerMenu className='text-black cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
          )}
          {user && (
            <div className="flex items-center flex-row gap-2 relative cursor-pointer" onClick={() => setProfileNav(!profileNav)}>
              <FaUserCircle className="text-2xl" />
              <h1>{user.first_name} {user.last_name}</h1>
              {profileNav && (
                <div className="bg-white border shadow-lg h-max w-[140px] flex flex-col items-start z-30 rounded-md absolute top-10 right-0">
                  <span className="hover:bg-gray-300 rounded-md p-2 w-full transition-all">
                    <Link to="/">Main Page</Link>
                  </span>
                  <span className="hover:bg-gray-300 rounded-md p-2 w-full transition-all">
                    <Link to="/dashboard/profile">Profile</Link>
                  </span>
                  <span className="hover:bg-gray-300 rounded-md p-2 w-full transition-all">
                    <button onClick={logoutUser}>Logout</button>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <main className={`bg-gray-200 min-h-screen absolute transition-all right-0 ${isOpen ? 'left-[200px]' : 'left-0'} text-black p-4 mt-[54px]`}>
          <Outlet />
          {message && <div className='fixed top-20 bg-green-400 border border-green-700 p-2 rounded-md right-5'>
            <p className='text-green-900'>{message}</p>
          </div>}
        </main>
      </div>
    </div>
  );
}
