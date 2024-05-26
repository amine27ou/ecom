import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import Logo from '../assets/logo.png';

export default function AdminLayout() {
  const [profileNav, setProfileNav] = useState(false);
  const { user, logoutUser, getUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      getUser();
    } else if (user.role !== 'admin') {
      navigate('/');
    }
  }, [user, getUser, navigate]);

  return (
    <div className="flex flex-row h-screen">
      <div className="sidebar bg-gray-500 w-[200px] flex flex-col items-center py-4 fixed left-0 top-0 bottom-0">
        <Link to='/'><img src={Logo} alt="Logo" className="w-20 mb-4" /></Link>
        <nav>
            <Link to='/dashboard' className='text-gray-800'>Dashboard</Link>
        </nav>
      </div>
      <div className="flex-grow ml-[200px]">
        <div className="navbar bg-gray-950 text-white p-4 flex items-center justify-between fixed top-0 left-[200px] right-0 z-10">
          <h1>Dashboard</h1>
          {user && (
            <div className="flex items-center flex-row gap-2 relative cursor-pointer" onClick={() => setProfileNav(!profileNav)}>
              <FaUserCircle className="text-2xl" />
              <h1>{user.first_name} {user.last_name}</h1>
              {profileNav && (
                <div className="bg-gray-500 border border-gray-800 shadow-lg h-max w-[140px] flex flex-col items-start z-30 rounded-md absolute top-10 right-0">
                  <span className="hover:bg-gray-800 p-2 w-full transition-all">
                    <Link to="/">Main Page</Link>
                  </span>
                  <span className="hover:bg-gray-800 p-2 w-full transition-all">
                    <Link to="/profile">Profile</Link>
                  </span>
                  <span className="hover:bg-gray-800 p-2 w-full transition-all">
                    <button onClick={logoutUser}>Logout</button>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <main className="bg-gray-700 h-screen text-white p-4 mt-[54px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
