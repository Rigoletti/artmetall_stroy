import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db_connect.mjs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions.mjs';
import authRoutes from './routes/authRoutes.mjs';
import createAdminUser from './config/initialSetup.mjs';

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

    // Routes
    app.use('/api/auth', authRoutes);

    // Test route
    app.get('/', (req, res) => {
      res.send('API is running...');
    });

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