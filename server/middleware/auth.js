import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const {token} = req.headers; 

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token missing',
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export default auth;
