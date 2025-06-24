import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db_connect.mjs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions.mjs';
import authRoutes from './routes/authRoutes.mjs';
import createAdminUser from './config/initialSetup.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import projectRoutes from './routes/projectRoutes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    
    console.log('Creating admin user...');
    await createAdminUser();
    
    const app = express();

    // Middleware
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Статическая раздача файлов
    app.use('/api/project-images', express.static(path.join(__dirname, 'uploads', 'project-images')));

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/projects', projectRoutes);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Admin email: ${process.env.ADMIN_EMAIL}`);
      console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
    });
    
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();