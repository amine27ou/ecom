import React, { useEffect, useState } from 'react';
import Header from '../../assets/header.webp';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuthContext } from '../../contexts/AuthContext';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoginForm() {
    const { login, user,errors,loading,getUser} = useAuthContext();
    const [formData, setFormData] = useState({});
    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
            navigate('/')
        }
        
    },[ getUser,navigate])    
    

    const handleChange = (e) => {
        setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="relative max-h-screen">
            <Link className="absolute m-10" to="/"><FaArrowLeft /></Link>
            <div className="flex items-start">
                <div className="hidden md:block">
                    <img src={Header} className="h-[900px] w-[500px] max-h-screen" alt="Header" />
                </div>
                <div className="p-10 flex items-center w-full md:w-1/2 justify-center flex-col">
                    <h1 className="my-10">SIGN IN</h1>
                    <form className="flex w-5/6 flex-col" onSubmit={handleSubmit}>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="EMAIL ADDRESS*"
                            className={`border-0 border-b-[1px] border-black outline-none mb-5 placeholder-black ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="PASSWORD*"
                            className={`border-0 border-b-[1px] border-black outline-none placeholder-black ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                        <p className="hover:text-gray-400 my-5">Forgotten your password?</p>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`text-white bg-black my-2 flex items-center justify-center p-2 hover:bg-gray-600 ${loading ? 'opacity-50 cursor-not-allowed ' : ''}`}
                        >
                            {loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'LOG IN'}
                        </button>
                        <Link to="/register" className="text-center border border-black p-2">SIGN UP</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
