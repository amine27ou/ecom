import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import Loading from '../../Loading';
import { axiosClient } from '../../../api/axios';
import { Link } from 'react-router-dom';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPosts = async (searchTitle = '') => {
    try {
      const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/blogs`, {
        params: { title: searchTitle }
      });
      if (response.status === 200) {
        setPosts(response.data.blogs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchPosts(title);
  };

  const AllPosts = (e) => {
    e.preventDefault();
    setTitle('');
    setLoading(true);
    fetchPosts();
  };

  const deletePost = async(e,id)=>{
    e.preventDefault()
    try{
      await axiosClient.delete(`${import.meta.env.VITE_BACKEND_URL}api/blogs/${id}`)
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div className='p-5 bg-gray-200'>
      <div className='flex justify-between my-5'>
        <div>

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
        <Link to='/dashboard/posts/add' className=' bg-blue-500 text-white h-max p-2 rounded-md'>Add Post</Link>
      </div>
      <div>
        {loading ? (
          <Loading color='black' />
        ) : (
          posts.map(post => (
            <div key={post.id} className="p-4 border rounded-md shadow-md bg-gray-100 mb-4">
              <div className='w-20 h-20 bg-white'>
              <img 
                src={post.featured_image && post.featured_image.includes('blog_') 
                  ? `${import.meta.env.VITE_BACKEND_URL}storage/blogs/${post.featured_image}` 
                  : post.featured_image
                } 
                alt={post.title} 
                className='w-full h-full object-cover' 
/>

              </div>
              <div className="mt-2">
                <Link to={`/dashboard/posts/${post.id}`} className="font-bold text-lg hover:text-gray-500">{post.title}</Link>
                <p className="text-sm text-gray-500">{post.excerpt}</p>
                <button onClick={(e)=>{deletePost(e,post.id)}} className="mt-2 bg-red-600 text-white p-2 rounded-md cursor-pointer">Remove</button>
                <button className="mt-2 bg-blue-600 text-white p-2 rounded-md cursor-pointer ml-5">Edit</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
