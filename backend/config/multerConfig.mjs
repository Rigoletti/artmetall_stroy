// backend/config/multerConfig.mjs
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Хранилище для аватарок
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/avatars/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// Хранилище для изображений проектов
const projectImagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/project-images/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// Фильтр для проверки типа файла
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Разрешены только изображения (jpeg, jpg, png, gif)'), false);
};

// Настройки загрузки аватарок
const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
});

// Настройки загрузки изображений проектов
const uploadProjectImages = multer({
  storage: projectImagesStorage,
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
});

// Middleware для обработки ошибок загрузки
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Размер файла не должен превышать 5MB' });
    }
    return res.status(400).json({ message: 'Ошибка при загрузке файла' });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

export { 
  uploadAvatar, 
  uploadProjectImages, 
  handleUploadErrors 
};