import Url from '../models/urlModel.js';

const redirectToUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    console.log(shortCode)

    const url = await Url.findOne({ alias: shortCode });

    if (!url) {
      return res.status(404).json({ 
        success: false, 
        message: 'URL not found' 
      });
    }

    // Check expiration
    if (url.expireDate && new Date() > new Date(url.expireDate)) {
      return res.status(410).json({ 
        success: false, 
        message: 'URL has expired' 
      });
    }

    // Increment click count
    url.clicks += 1;

    // Basic tracking
    const userAgent = req.headers['user-agent'];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    let device = 'Unknown';
    if (userAgent) {
      if (/mobile/i.test(userAgent)) device = 'Mobile';
      else if (/tablet/i.test(userAgent)) device = 'Tablet';
      else device = 'Desktop';
    }

    let browser = 'Unknown';
    if (userAgent) {
      if (/chrome/i.test(userAgent)) browser = 'Chrome';
      else if (/firefox/i.test(userAgent)) browser = 'Firefox';
      else if (/safari/i.test(userAgent)) browser = 'Safari';
      else if (/edge/i.test(userAgent)) browser = 'Edge';
      else if (/opera/i.test(userAgent)) browser = 'Opera';
      else if (/msie|trident/i.test(userAgent)) browser = 'Internet Explorer';
    }

    url.clickData.push({
      timestamp: new Date(),
      ipAddress: ip,
      browser,
      device,
      location: 'Unknown'
    });

    await url.save();

    // ✅ Only return longUrl
    return res.status(200).json({
      success: true,
      data: {
        longUrl: url.longUrl,
        createdAt: url.createdAt,
        expireDate: url.expireDate,
        clicks: url.clicks
      }
    });

  } catch (error) {
    console.error('Error fetching URL:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export default redirectToUrl;

