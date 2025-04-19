import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../componets/Header.jsx';

const LinkDetail = () => {
  const { alias } = useParams();
  const [linkDetails, setLinkDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinkDetails = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL;
        // Fix template literal syntax
        const response = await axios.get(`${API_URL}/api/${alias}`);

        if (response.data.success) {
          const { longUrl, createdAt, expireDate, clicks } = response.data.data;
          setLinkDetails({
            alias,
            longUrl,
            createdAt,
            expireDate,
            clicks
          });
        } else {
          toast.error('Link not found');
        }
      } catch (error) {
        toast.error('Link not found or error fetching');
      } finally {
        setLoading(false);
      }
    };

    fetchLinkDetails();
  }, [alias]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading...</div>
          </div>
        ) : linkDetails ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Link Details</h2>
            <p className="mb-2"><strong>Short URL:</strong> {linkDetails.alias}</p>
            <p className="mb-2"><strong>Long URL:</strong> <a href={linkDetails.longUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{linkDetails.longUrl}</a></p>
            <p className="mb-2"><strong>Created at:</strong> {new Date(linkDetails.createdAt).toLocaleDateString()}</p>
            <p className="mb-2"><strong>Expires at:</strong> {linkDetails.expireDate ? new Date(linkDetails.expireDate).toLocaleString() : 'No expiration'}</p>
            <p className="mb-2"><strong>Clicks:</strong> {linkDetails.clicks}</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-medium text-gray-700">Link not found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkDetail;

