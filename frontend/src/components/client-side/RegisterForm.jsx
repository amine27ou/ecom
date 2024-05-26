import React, { useState } from 'react';
import Header from '../../assets/header.webp';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { useAuthContext } from '../../contexts/AuthContext';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '' 
    });
    const { register, loading, errors } = useAuthContext();

    const handleChange = (e) => {
        setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData);
    }
    return (
        <div className='relative'>
            <Link to='/login' className='absolute m-10'><FaArrowLeft /></Link>
            <div className='flex items-start'>
                <div className='hidden md:block'>
                    <img src={Header} className='h-[900px] w-[500px] max-h-screen' alt="Header" />
                </div>
                <div className='p-10 flex items-center justify-center flex-col w-full md:w-1/2'>
                    <h1 className='my-10'>CREATE ACCOUNT</h1>
                    <form className='flex w-5/6 flex-col' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            onChange={handleChange}
                            name='first_name'
                            placeholder="FIRST NAME*"
                            className={`border-0 border-b-[1px] border-black outline-none mb-5 placeholder-black ${errors.first_name && 'border-red-500 placeholder-red-500'}`}
                            required
                        />
                        {errors.first_name && <p className='text-red-500 mb-4'>{errors.first_name}</p>}

                        <input
                            type="text"
                            name='last_name'
                            onChange={handleChange}
                            placeholder="LAST NAME*"
                            className={`border-0 border-b-[1px] border-black outline-none mb-5 placeholder-black ${errors.last_name && 'border-red-500 placeholder-red-500'}`}
                            required
                        />
                        {errors.last_name && <p className='text-red-500 mb-4'>{errors.last_name}</p>}

                        <input
                            type="email"
                            onChange={handleChange}
                            name='email'
                            placeholder="EMAIL ADDRESS*"
                            className={`border-0 border-b-[1px] border-black mb-5 outline-none placeholder-black ${errors.email && 'border-red-500 placeholder-red-500'}`}
                            required
                        />
                        {errors.email && <p className='text-red-500 mb-4'>{errors.email}</p>}

                        <input
                            type="password"
                            name='password'
                            onChange={handleChange}
                            placeholder="PASSWORD*"
                            className={`border-0 border-b-[1px] border-black outline-none mb-5 placeholder-black ${errors.password && 'border-red-500 placeholder-red-500'}`}
                            required
                        />
                        {errors.password && <p className='text-red-500 mb-4'>{errors.password}</p>}

                        <input
                            type="password"
                            name='password_confirmation'
                            onChange={handleChange}
                            placeholder="CONFIRM PASSWORD*"
                            className={`border-0 border-b-[1px] border-black outline-none mb-5 placeholder-black ${errors.password_confirmation && 'border-red-500 placeholder-red-500'}`}
                            required
                        />
                        {errors.password_confirmation && <p className='text-red-500 mb-4'>{errors.password_confirmation}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`text-white bg-black my-2 flex items-center justify-center p-2 hover:bg-gray-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'CONTINUE'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
