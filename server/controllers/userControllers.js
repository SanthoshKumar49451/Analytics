import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Not a valid email',
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least 8 characters',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email does not exist',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password',
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.json({
      token,
      success: true,
      message: 'Login success',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export  { register, logIn};
