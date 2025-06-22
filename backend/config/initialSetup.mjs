import User from '../models/User.mjs';
import dotenv from 'dotenv';

dotenv.config();

const createAdminUser = async () => {
  try {
    console.log('=== Admin Setup ===');
    
    // Удаляем существующего админа
    await User.deleteMany({ email: process.env.ADMIN_EMAIL });
    console.log('Old admin removed');

    // Создаем нового админа без предварительного хеширования
    const admin = await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD, // Пароль хешируется автоматически в pre('save')
      role: 'admin'
    });

    console.log('Admin created successfully:', {
      email: admin.email,
      role: admin.role
    });

  } catch (error) {
    console.error('Admin setup failed:', error);
    throw error;
  }
};

export default createAdminUser;