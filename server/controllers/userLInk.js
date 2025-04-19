// controllers/userLInk.js
import Url from '../models/urlModel.js';

const getUserLinks = async (req, res) => {
  try {
    const userId = req.user.id;
    
    
    const userLinks = await Url.find({ user: userId });
    
    return res.json({
      success: true,
      data: userLinks
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default getUserLinks;