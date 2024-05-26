import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className='flex flex-col gap-10 justify-between items-start md:flex-row p-10'>
        <div className='flex flex-col'>
            <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-yellow-500' : 'text-black')}
            >
            Home
            </NavLink>
            <NavLink
            to="/store"
            className={({ isActive }) => (isActive ? 'text-yellow-500' : 'text-black')}
            >
            Store
            </NavLink>
            <NavLink
            to="/store"
            className={({ isActive }) => (isActive ? 'text-yellow-500' : 'text-black')}
            >
            About
            </NavLink>
            <NavLink
            to="/store"
            className={({ isActive }) => (isActive ? 'text-yellow-500' : 'text-black')}
            >
            Blog
            </NavLink>
        </div>
        <div className='flex flex-col'>
            <p>500 Terry Francine St.<br/>
            San Francisco, CA 94158</p>
            <p>Email : info@my-domain.com</p>
            <p>Tel : 1-800-000-0000</p>
        </div>
        <div className='flex flex-col'>
            <Link className='hover:text-yellow-600' to='/shipping-returns'>Shipping & returns </Link>
            <Link className='hover:text-yellow-600' to='/FAQ'>FAQ</Link>
            <div className='flex flex-row gap-2 '>
                <FaFacebookF/>
                <FaTwitter/>
                <FaInstagram/>
            </div>
        </div>
            <div className='flex flex-col '>
                <p>Receive all our news and updates</p>
                <input type='text' className='border p-2 w-full m-1 rounded-sm' placeholder='Email Address*'/><br/>
                <button className='bg-gray-200 p-2 m-1 w-full hover:bg-yellow-700 hover:text-white transition-all'>Subscribe Now</button>
                <p className='mt-10'>©2024 by Giovanni Menswear. Powered and secured by Amine Outkacha</p>
            </div>
        
    </div>
  )
}
