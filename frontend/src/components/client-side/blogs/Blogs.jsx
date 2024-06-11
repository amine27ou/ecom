import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import Loading from '../../Loading';
import { axiosClient } from '../../../api/axios';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async (searchTitle = '') => {
    try {
      const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/blogs`, {
        params: { title: searchTitle }
      });
      if (response.status === 200) {
        setBlogs(response.data.blogs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchBlogs(title);
  };
  const AllPosts = (e)=>{
    e.preventDefault()
    setTitle('')
    setLoading(true);
    fetchBlogs()
  }

  return (
    <div className='p-5 bg-gray-200'>
      <div className='flex justify-between my-5'>
        <button onClick={AllPosts} className='font-bold'>All Posts</button>
        <form onSubmit={handleSearch} className='flex items-center gap-2 border border-gray-500 rounded-md p-1 outline-none bg-transparent'>
          <input 
            type='text' 
            onChange={(e) => setTitle(e.target.value)} 
            value={title} 
            name='title' 
            placeholder='Post title'
            className='rounded-md p-1 outline-none bg-transparent' 
          />
          <button type='submit' className='flex items-center text-2xl font-bold rounded-md'>
            <CiSearch />
          </button>
        </form>
      </div>
      <div>
        {loading ? (
          <Loading color='black' />
        ) : (
          blogs.map(blog => (
            <div key={blog.id} className="p-4 border rounded-md shadow-md bg-gray-100 mb-4">
              <div className='w-20 h-20 bg-white'>
                <img src={blog.featured_image} alt={blog.title} className='w-full h-full object-cover' />
              </div>
              <div className="mt-2">
                <p className="font-bold text-lg">{blog.title}</p>
                <p className="text-sm text-gray-500">{blog.excerpt}</p>
                <button className="mt-2 text-blue-500">Like</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
