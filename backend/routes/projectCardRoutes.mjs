import express from 'express';
import { 
  createCard, 
  getAllCards, 
  getProjectImage,
  updateCard, 
  deleteCard 
} from '../controllers/projectCardController.mjs';
import { protect, admin } from '../middleware/authMiddleware.mjs';
import { uploadProjectImages, handleUploadErrors } from '../config/multerConfig.mjs';

const router = express.Router();

// Маршрут для получения изображений
router.get('/project-images/:filename', getProjectImage);

router.route('/')
  .post(
    protect, 
    admin, 
    uploadProjectImages.array('images', 3),
    handleUploadErrors,
    createCard
  )
  .get(getAllCards);

router.route('/:id')
  .put(
    protect, 
    admin, 
    uploadProjectImages.array('images', 3),
    handleUploadErrors,
    updateCard
  )
  .delete(protect, admin, deleteCard);

export default router;