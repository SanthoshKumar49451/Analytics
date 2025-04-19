import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import CreateUrlModal from './CreateUrlModal';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Function to determine if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-between gap-2 md:gap-5 px-6 py-3 bg-white shadow-md'>
      <div className="flex items-center">
        <h1 className='font-bold text-2xl text-blue-600'>URL Shortener</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        <button
          id="createUrlBtn"
          onClick={() => setIsModalOpen(true)}
          className='bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-md transition-colors text-sm md:text-base'
        >
          Create URL
        </button>

        <button
          onClick={() => navigate('/')}
          className={`px-3 md:px-4 py-1 md:py-2 rounded-md transition-colors text-sm md:text-base ${isActive('/')
              ? 'bg-blue-100 text-blue-700'
              : 'text-blue-600 hover:bg-blue-50'
            }`}
        >
          All Links
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className={`px-3 md:px-4 py-1 md:py-2 rounded-md transition-colors text-sm md:text-base ${isActive('/dashboard')
              ? 'bg-blue-100 text-blue-700'
              : 'text-blue-600 hover:bg-blue-50'
            }`}
        >
          Dashboard
        </button>

        <button
          onClick={handleLogout}
          className='text-red-500 hover:text-red-700 transition-colors px-3 md:px-4 py-1 md:py-2 text-sm md:text-base'
        >
          Logout
        </button>
      </div>

      {isModalOpen && <CreateUrlModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );

};

export default Header;