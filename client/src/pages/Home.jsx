import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../componets/Header.jsx';
import LinkCard from '../componets/LinkCard.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const [allLinks, setAllLinks] = useState([]);
  const [loadingAllLinks, setLoadingAllLinks] = useState(false);

  const fetchAllLinks = async () => {
    try {
      setLoadingAllLinks(true);
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      // Fix template literal syntax
      const response = await axios.get(`${API_URL}/api/all`);
     
      if (response.data.success) {
        setAllLinks(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching all links:', error);
      toast.error('Failed to fetch links');
    } finally {
      setLoadingAllLinks(false);
    }
  };

  useEffect(() => {
    fetchAllLinks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">All Short URLs</h1>
          <p className="text-gray-600">Browse all available shortened URLs</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          {loadingAllLinks ? (
            <div className="text-center py-8">Loading links...</div>
          ) : allLinks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No links available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {allLinks.map(link => (
                <LinkCard key={link._id} link={link} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;