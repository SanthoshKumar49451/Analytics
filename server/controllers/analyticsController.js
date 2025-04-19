// controllers/analyticsController.js
import Url from '../models/urlModel.js';

const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find all URLs created by the user
    const userUrls = await Url.find({ user: userId });
    
    if (!userUrls.length) {
      return res.json({
        success: true,
        data: {
          totalClicks: 0,
          clicksByDate: [],
          deviceData: [],
          browserData: [],
          topLinks: []
        }
      });
    }
    
    // Calculate total clicks
    const totalClicks = userUrls.reduce((sum, url) => sum + url.clicks, 0);
    
    // Process clicks by date
    const clickDates = {};
    
    userUrls.forEach(url => {
      url.clickData.forEach(click => {
        const date = click.timestamp.toISOString().split('T')[0];
        clickDates[date] = (clickDates[date] || 0) + 1;
      });
    });
    
    const clicksByDate = Object.keys(clickDates).map(date => ({
      date,
      clicks: clickDates[date]
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Process device data
    const devices = {};
    userUrls.forEach(url => {
      url.clickData.forEach(click => {
        devices[click.device] = (devices[click.device] || 0) + 1;
      });
    });
    
    const deviceData = Object.keys(devices).map(device => ({
      name: device,
      value: devices[device]
    }));
    
    // Process browser data
    const browsers = {};
    userUrls.forEach(url => {
      url.clickData.forEach(click => {
        browsers[click.browser] = (browsers[click.browser] || 0) + 1;
      });
    });
    
    const browserData = Object.keys(browsers).map(browser => ({
      name: browser,
      value: browsers[browser]
    }));
    
    // Get top performing links
    const topLinks = userUrls
      .map(url => ({
        name: url.alias,
        clicks: url.clicks
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);
    
    return res.json({
      success: true,
      data: {
        totalClicks,
        clicksByDate,
        deviceData,
        browserData,
        topLinks
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export default getAnalytics;