import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { axiosClient } from '../../../api/axios';
import { useAuthContext } from '../../../contexts/AuthContext';

export default function Profile() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const { user } = useAuthContext();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.password){
            setErrors({password:'Enter Your Password to apply changes!'})
        }
        else{

            try{
                setLoading(true)
                const response = await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/user/update`,{...formData,_method:'PUT'})
            if(response.status === 200){
                setLoading(false)
                if(user.role === 'admin'){
                    navigate('/dashboard/stats')
                }else{
                    navigate('/')
                }
            }
        }catch(err){
            if(err.response && err.response.status === 422){
                setLoading(false)
                setErrors(err.response.data.errors)
            }
        }
    }
    };

    useEffect(() => {
        if (user && user.first_name && user.last_name && user.email) {
            setLoading(false);
            setFormData({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: '',
            });
        }
    }, []);

    return (
        <div className=''>
            <h1 className='m-10  text-2xl font-bold'>User Informations</h1>
            <div className='flex items-start'>
                <div className='p-10 flex items-center justify-center flex-col w-full  bg-white'>
                    <form className='flex w-5/6 flex-col' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            onChange={handleChange}
                            value={formData.first_name}
                            name='first_name'
                            placeholder="FIRST NAME*"
                            className={`border-0 border-b-[1px] border-black outline-none mb-5 placeholder-black ${errors.first_name && 'border-red-500 placeholder-red-500'}`}
                            
                        />
                        {errors.first_name && <p className='text-red-500 mb-4'>{errors.first_name}</p>}

                        <input
                            type="text"
                            name='last_name'
                            onChange={handleChange}
                            value={formData.last_name}
                            placeholder="LAST NAME*"
                            className={`border-0 border-b-[1px] border-black outline-none mb-5 placeholder-black ${errors.last_name && 'border-red-500 placeholder-red-500'}`}
                            
                        />
                        {errors.last_name && <p className='text-red-500 mb-4'>{errors.last_name}</p>}

                        <input
                            type="email"
                            onChange={handleChange}
                            value={formData.email}
                            name='email'
                            placeholder="EMAIL ADDRESS*"
                            className={`border-0 border-b-[1px] border-black mb-5 outline-none placeholder-black ${errors.email && 'border-red-500 placeholder-red-500'}`}
                            
                        />
                        {errors.email && <p className='text-red-500 mb-4'>{errors.email}</p>}

                        <input
                            type="password"
                            name='password'
                            onChange={handleChange}
                            value={formData.password}
                            placeholder="PASSWORD*"
                            className={`border-0 border-b-[1px] border-black outline-none mb-5 placeholder-black ${errors.password && 'border-red-500 placeholder-red-500'}`}
                            required
                        />
                        {errors.password && <p className='text-red-500 mb-4'>{errors.password}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`text-white w-max rounded-md bg-black my-2 flex items-center justify-center p-2 hover:bg-gray-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'CONTINUE'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}