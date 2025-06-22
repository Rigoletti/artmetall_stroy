import User from "../models/User.mjs";
import asyncHandler from 'express-async-handler';
import generateToken from "../utils/generateToken.mjs";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: email === process.env.ADMIN_EMAIL ? 'admin' : 'user'
  });

  res.status(201).json({
    message: "Registration successful! Please login.",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);

  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    console.log('User not found');
    res.status(401);
    throw new Error("Invalid credentials");
  }

  console.log('Found user:', user.email);
  const isMatch = await user.matchPassword(password);
  console.log('Password match:', isMatch);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  generateToken(res, user._id);
  
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).json(user);
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.file) {
    if (user.avatar) {
      const oldAvatarPath = path.join(__dirname, '..', 'uploads', 'avatars', user.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }
    user.avatar = req.file.filename;
  }

  const updatedUser = await user.save();
  
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    avatar: updatedUser.avatar,
    role: updatedUser.role
  });
});

const getAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  
  if (!user?.avatar) {
    res.status(404);
    throw new Error('Avatar not found');
  }

  const avatarPath = path.join(__dirname, '..', 'uploads', 'avatars', user.avatar);
  
  if (!fs.existsSync(avatarPath)) {
    res.status(404);
    throw new Error('Avatar file not found');
  }

  res.sendFile(avatarPath);
});

export { 
  registerUser, 
  loginUser, 
  getMe, 
  logoutUser, 
  updateProfile, 
  getAvatar 
};