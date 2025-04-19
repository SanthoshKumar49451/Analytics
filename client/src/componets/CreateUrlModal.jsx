import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createShortUrl } from '../redux/urlSlice';
import { toast } from 'react-toastify';

const CreateUrlModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    longUrl: '',
    alias: '',
    expireDate: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.longUrl) {
      toast.error('URL is required');
      setLoading(false);
      return;
    }

    try {
      await dispatch(createShortUrl(formData)).unwrap();
      toast.success('URL created successfully!');
      onClose();
    } catch (error) {
      toast.error(error || 'Failed to create URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Short URL</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Original URL *
            </label>
            <input
              type="url"
              name="longUrl"
              id="longUrl"
              value={formData.longUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com/long-url"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="alias" className="block text-sm font-medium text-gray-700 mb-1">
              Custom Alias (Optional)
            </label>
            <input
              type="text"
              name="alias"
              id="alias"
              value={formData.alias}
              onChange={handleChange}
              placeholder="e.g., my-custom-url"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty for random short code
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="expireDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date (Optional)
            </label>
            <input
              type="datetime-local"
              name="expireDate"
              id="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create URL'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUrlModal;