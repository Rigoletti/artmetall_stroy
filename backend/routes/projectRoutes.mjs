import express from 'express';
import { 
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  updateProjectsOrder
} from "../controllers/projectController.mjs";
import { protect, admin } from '../middleware/authMiddleware.mjs';
import { uploadProjectImages, handleUploadErrors } from '../config/multerConfig.mjs';

const router = express.Router();

// Public routes
router.get('/', getProjects);

// Protected admin routes
router.post('/', protect, admin, uploadProjectImages.single('image'), handleUploadErrors, createProject);
router.put('/:id', protect, admin, uploadProjectImages.single('image'), handleUploadErrors, updateProject);
router.delete('/:id', protect, admin, deleteProject);
router.put('/order/update', protect, admin, updateProjectsOrder);

export default router;