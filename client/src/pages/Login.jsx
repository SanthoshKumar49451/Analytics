import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token) || localStorage.getItem('token');
  const { loading, error } = useSelector((state) => state.user);
  
  // Add state to prevent duplicate toast notifications
  const [loginAttempted, setLoginAttempted] = useState(false);

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  useEffect(() => {
    // Only show success toast once when login status changes
    if (loginAttempted) {
      if (loading === 'succeeded') {
        toast.success('Login successful!');
        navigate('/home');
        setLoginAttempted(false); // Reset to prevent duplicate toasts
      } else if (loading === 'failed' && error) {
        toast.error(error);
        setLoginAttempted(false); // Reset to prevent duplicate toasts
      }
    }
  }, [loading, error, navigate, loginAttempted]);

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginAttempted(true); // Mark that a login attempt has been made
    dispatch(loginUser(formData)); // Dispatch login action
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading === 'pending'}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading === 'pending' ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

