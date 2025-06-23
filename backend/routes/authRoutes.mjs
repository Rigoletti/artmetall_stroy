import express from 'express';
import { 
  registerUser, 
  loginUser,
  getMe,
  updateProfile,
  logoutUser,
  getAvatar
} from "../controllers/authController.mjs";
import { protect, admin } from '../middleware/authMiddleware.mjs';
import { uploadAvatar, handleUploadErrors } from '../config/multerConfig.mjs';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/avatar/:userId', getAvatar);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logoutUser);
router.put('/profile', protect, uploadAvatar.single('avatar'), handleUploadErrors, updateProfile);

// Admin routes
router.get('/admin-check', protect, admin, (req, res) => {
  res.json({ message: 'Admin access granted' });
});

export default router;