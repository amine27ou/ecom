import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../api/axios';
import axios from 'axios';

const LoginContext = createContext();

export default function AuthContext({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const csrf = async () => {
    await axiosClient.get('/sanctum/csrf-cookie');
  };

  const getUser = async () => {
    try {
      const response = await axiosClient.get('api/user');
      setUser(response.data);
    } catch (error) {
      
    }
  };

  const login = async (formData) => {
    setLoading(true);
    try {
      await csrf();
      const response = await axiosClient.post('login', formData);
      if (response.status === 200) {
        setLoading(false);
        navigate('/');
        localStorage.setItem('auth-token', response.data.token);
        await getUser();
        setErrors({});
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      await csrf();
      const response = await axiosClient.post('register', formData);
      if (response.status === 204 || response.status === 200) {
        setLoading(false);
        navigate('/login');
        setErrors({});
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };

  const logoutUser =  () => {
    try {
       axiosClient.post('logout');
      localStorage.removeItem('auth-token');
      setUser({});
      navigate('/');
    } catch (error) {
      
    }
  };

  return (
    <LoginContext.Provider value={{ login, errors, user, getUser, loading, register,logoutUser }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useAuthContext = () => useContext(LoginContext);
