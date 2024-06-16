import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../api/axios';


export default function UsersList() {
    const [users,setUsers] = useState([])
    const fetchData = async () => {
        try {
          const usersResponse = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/users`);    
          if (usersResponse.status === 200) {
            setUsers(usersResponse.data.users);
          }
        }
          catch (err) {
          console.error('Error fetching data:', err);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
  return (
    <div className='flex items-center justify-center'>
        <table  border={1}>
            <tr className='bg-gray-300'>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined At</th>
            </tr>
            {users.map(user=>(
                <tr className='bg-white'>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.created_at.split('T')[0]}</td>

                </tr>
            ))}
        </table>
    </div>
  )
}
