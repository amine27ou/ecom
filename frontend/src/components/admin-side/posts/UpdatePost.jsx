import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';
import Loading from '../../Loading';

export default function UpdatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
    excerpt: '',
    featured_image: null,
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  const handleChange = (e) => {
    const { type, files, value, name } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const fetchPost = async () => {
    try {
      const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/blogs/${id}`);
      if (response.status === 200) {
        setFormData({
          title: response.data.blog.title,
          content: response.data.blog.content,
          status: response.data.blog.status,
          excerpt: response.data.blog.excerpt,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosClient.post(
        `${import.meta.env.VITE_BACKEND_URL}api/blogs/${id}`,
        {...formData,_method:'PUT'},
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        setMessage(response.data.message)
        navigate('/dashboard/posts');
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Update Post</h1>
        <Link
          to="/dashboard/posts"
          className="bg-transparent text-black border border-black p-2 rounded-md hover:bg-black hover:text-white"
        >
          Back
        </Link>
      </div>
      {loading ? (
        <Loading color="black" />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label>
              Title<span className="text-red-600">*</span>:
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="title"
              value={formData.title || ''}
              placeholder="Post Title"
              className="bg-gray-300 text-black outline-none p-2 rounded-md"
            />
            {errors.title && <p className="text-red-500 mb-4">{errors.title}</p>}
          </div>
          <div className="flex flex-col mb-4">
            <label>
              Content<span className="text-red-600">*</span>:
            </label>
            <textarea
              onChange={handleChange}
              name="content"
              value={formData.content || ''}
              placeholder="Post Content"
              className="bg-gray-300 text-black outline-none p-2 rounded-md"
            />
            {errors.content && <p className="text-red-500 mb-4">{errors.content}</p>}
          </div>
          <div className="flex flex-col mb-4">
            <label>
              Status<span className="text-red-600">*</span>:
            </label>
            <select
              onChange={handleChange}
              name="status"
              value={formData.status}
              className="bg-gray-300 text-black outline-none p-2 rounded-md"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            {errors.status && <p className="text-red-500 mb-4">{errors.status}</p>}
          </div>
          <div className="flex flex-col mb-4">
            <label>Excerpt:</label>
            <textarea
              onChange={handleChange}
              name="excerpt"
              value={formData.excerpt || ''}
              placeholder="Post Excerpt"
              className="bg-gray-300 text-black outline-none p-2 rounded-md"
            />
            {errors.excerpt && <p className="text-red-500 mb-4">{errors.excerpt}</p>}
          </div>
          <div className="flex flex-col mb-4">
            <label>
              Featured Image<span className="text-red-600">*</span>:
            </label>
            <input
              onChange={handleChange}
              type="file"
              name="featured_image"
              className="bg-gray-300 text-black outline-none p-2 rounded-md"
            />
            {errors.featured_image && <p className="text-red-500 mb-4">{errors.featured_image}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Update Post
          </button>
        </form>
      )}
    </div>
  );
}
