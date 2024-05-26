import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

export default function AdminLayout() {
    const [profileNav,setProfileNav] = useState(false)
    const {user,logoutUser,getUser} = useAuthContext()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            getUser()
        }
        else if(user.role === 'client'){
            navigate('/')
        }
        
    }
    ,[getUser])

    return (
    <div>
        <div className='bg-yellow-950'>
                <div>
                    <h1>Dashboard</h1>
                    {user && <div className='flex items-center flex-row gap-2 relative cursor-pointer' onClick={() => setProfileNav(!profileNav)}>
                <FaUserCircle className="text-2xl" />
                <h1>{user.first_name} {user.last_name}</h1>
                {profileNav && (
                    <div className='bg-white border shadow-lg h-max w-[140px] flex flex-col items-start z-30 rounded-md absolute top-10'>
                    <span className='hover:bg-gray-300 p-2 w-full transition-all'>
                        <Link to="/">Main Page</Link>
                    </span>
                    <span className='hover:bg-gray-300 p-2 w-full transition-all'>
                        <Link to="/profile">Profile</Link>
                    </span>
                    <span className='hover:bg-gray-300 p-2 w-full transition-all'>
                        <button onClick={logoutUser}>Logout</button>
                    </span>
                    </div>
                )}    
                </div>}
            </div>
                
        </div>

        <main className='bg-yellow-700'>
            <Outlet/>
        </main>
    </div>
  )
}
