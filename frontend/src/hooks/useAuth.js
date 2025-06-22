import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        withCredentials: true
      });
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const register = async (userData) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register', 
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login', 
        credentials, 
        { withCredentials: true }
      );
      await checkAuth();
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/auth/logout', 
        {}, 
        { withCredentials: true }
      );
      setUser(null);
      navigate('/login');
    } catch (error) {
      throw error;
    }
  };

  const isAdmin = () => user?.role === 'admin';

  return { 
    user, 
    loading, 
    register, 
    login, 
    logout, 
    isAdmin, 
    setUser,
    checkAuth 
  };
};