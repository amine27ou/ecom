import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';
import Loading from '../../Loading'; // Assuming you have a Loading component

export default function ShowPost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchPost = async () => {
    try {
      const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/blogs/${id}`);
      if (response.status === 200) {
        setPost(response.data.blog);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  return (
    <div className="container mx-auto p-4 bg-gray-200">
      {loading ? (
        <Loading color="black" /> 
      ) : (
        <div className="post">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          {post.featured_image && (
            <img src={post.featured_image && post.featured_image.includes('blog_') 
              ? `${import.meta.env.VITE_BACKEND_URL}storage/blogs/${post.featured_image}` 
              : post.featured_image
            } alt={post.title} className="mb-4 w-full h-auto" />
          )}
          
          <div className="excerpt mb-4">
            <span className="font-semibold">Excerpt: </span>
            <p>{post.excerpt}</p>
          </div>
          <div className="content">
            <span className="font-semibold">Content: </span>
            <p>{post.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
