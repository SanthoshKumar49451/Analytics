
// routes/index.js
import express from 'express';
import { createLink } from '../controllers/urlControllers.js';
import getUserLinks from '../controllers/userLInk.js';
import redirectToUrl from '../controllers/redirect.js';
import getAnalytics from '../controllers/analyticsController.js';
import auth from '../middleware/auth.js';
import { logIn, register } from '../controllers/userControllers.js';
import { getAllUrls } from '../controllers/urlControllers.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', logIn);

// Public URL redirect route
router.get('/all', getAllUrls);
router.get('/:shortCode', redirectToUrl);


// Protected routes
router.post('/create', auth, createLink);
router.get('/user/links', auth, getUserLinks);
router.get('/analytics', auth, getAnalytics);

export default router;
