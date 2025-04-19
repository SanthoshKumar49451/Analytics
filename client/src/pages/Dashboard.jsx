import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLinks, fetchAnalytics } from '../redux/urlSlice';
import {
  BarChart, LineChart, PieChart,
  Tooltip, Legend, Bar, Line,
  XAxis, YAxis, CartesianGrid, Pie, Cell
} from 'recharts';
import Header from '../componets/Header.jsx';
import LinkCard from '../componets/LinkCard.jsx';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { links, analytics, loading } = useSelector(state => state.url);

  useEffect(() => {

    dispatch(fetchUserLinks());
    dispatch(fetchAnalytics());
  }, [dispatch]);


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  if (loading === 'pending') {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto p-8 flex justify-center items-center">
          <div className="text-lg">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Overview of your URL shortener activity</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-500 text-sm mb-1">Total Links</h3>
            <p className="text-2xl font-bold">{links.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-500 text-sm mb-1">Total Clicks</h3>
            <p className="text-2xl font-bold">{analytics.totalClicks || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-500 text-sm mb-1">Avg. Clicks Per Link</h3>
            <p className="text-2xl font-bold">
              {links.length > 0 ? ((analytics.totalClicks || 0) / links.length).toFixed(1) : '0'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-500 text-sm mb-1">Active Links</h3>
            <p className="text-2xl font-bold">
              {links.filter(link => !link.expireDate || new Date(link.expireDate) > new Date()).length}
            </p>
          </div>
        </div>

        {/* My Links Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">My Short URLs</h1>
          <p className="text-gray-600">Manage and track your shortened URLs</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          {loading === 'pending' ? (
            <div className="text-center py-8">Loading your links...</div>
          ) : links.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>You haven't created any links yet.</p>
              <button
                onClick={() => document.getElementById('createUrlBtn')?.click()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create Your First Link
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {links.map(link => (
                <LinkCard key={link._id} link={link} />
              ))}
            </div>
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Clicks Over Time chart */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-medium mb-4">Clicks Over Time</h3>
            <div className="h-64">
              {analytics.clicksByDate && analytics.clicksByDate.length > 0 ? (
                <LineChart width={500} height={250} data={analytics.clicksByDate} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No click data available
                </div>
              )}
            </div>
          </div>

          {/* Device distribution chart */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-medium mb-4">Device Distribution</h3>
            <div className="h-64">
              {analytics.deviceData && analytics.deviceData.length > 0 ? (
                <PieChart width={500} height={250}>
                  <Pie
                    data={analytics.deviceData}
                    cx={250}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {analytics.deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No device data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top performing links */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-medium mb-4">Top Performing Links</h3>
          <div className="h-64">
            {analytics.topLinks && analytics.topLinks.length > 0 ? (
              <BarChart width={1000} height={250} data={analytics.topLinks} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clicks" fill="#82ca9d" />
              </BarChart>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                No link performance data available
              </div>
            )}
          </div>
        </div>

        {/* Browser distribution */}
        <div className="bg-white rounded-lg shadow-md p-4 mt-6">
          <h3 className="font-medium mb-4">Browser Distribution</h3>
          <div className="h-64">
            {analytics.browserData && analytics.browserData.length > 0 ? (
              <BarChart width={1000} height={250} data={analytics.browserData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                No browser data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;