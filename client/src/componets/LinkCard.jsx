import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const LinkCard = ({ link }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;
  // Fix template literal syntax
  const shortUrl = `${baseUrl}/${link.alias}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        setCopied(true);
        toast.success('URL copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy URL');
      });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No expiration';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Check if link is expired
  const isExpired = link.expireDate && new Date(link.expireDate) < new Date();

  return (
    <div className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${isExpired ? 'bg-gray-50 opacity-75' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-lg flex items-center">
            {shortUrl}
            {isExpired && (
              <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                Expired
              </span>
            )}
          </h3>
          <p className="text-gray-500 text-sm truncate">{link.longUrl}</p>
        </div>
        <button
          onClick={copyToClipboard}
          className={`text-blue-500 hover:text-blue-700 ${copied ? 'text-green-500' : ''}`}
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <div>Created: {new Date(link.createdAt).toLocaleDateString()}</div>
        <div>Expires: {formatDate(link.expireDate)}</div>
      </div>

      <div className="mt-3 pt-3 border-t flex justify-between items-center">
        <div className="flex items-center text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>{link.clicks} clicks</span>
        </div>
        <Link
          to={`/${link.alias}`}
          className="text-blue-500 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default LinkCard;