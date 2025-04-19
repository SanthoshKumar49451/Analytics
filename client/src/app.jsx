import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinkDetail from './pages/LinkDetail';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.user.token) || localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      // Only redirect if on login/register/root
      if (location.pathname === '/' || location.pathname === '/login') {
        navigate('/home');
      }
    } else {
      // If not logged in, block access to private routes
      const publicRoutes = ['/', '/login'];
      if (!publicRoutes.includes(location.pathname)) {
        navigate('/login');
      }
    }
  }, [token, location.pathname, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:alias" element={<LinkDetail />} /> 
      </Routes>
    </div>
  );
};

export default App;

