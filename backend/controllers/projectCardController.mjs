import ProjectCard from '../models/ProjectCard.mjs';
import asyncHandler from 'express-async-handler';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createCard = asyncHandler(async (req, res) => {
  try {
    const { title, category, description, color, icon } = req.body;
    
    if (!title || !category || !description || !color || !icon) {
      return res.status(400).json({ message: 'Все обязательные поля должны быть заполнены' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Необходимо загрузить хотя бы одно изображение' });
    }

    const images = req.files.map(file => `/api/project-images/${file.filename}`);

    const card = await ProjectCard.create({
      title,
      category,
      description,
      color,
      icon,
      images
    });

    res.status(201).json(card);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ message: 'Ошибка при создании карточки' });
  }
});

const getAllCards = asyncHandler(async (req, res) => {
  const cards = await ProjectCard.find({}).sort('-createdAt');
  res.json(cards);
});

const getProjectImage = asyncHandler(async (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, '../uploads/project-images', filename);
  
  if (!fs.existsSync(imagePath)) {
    res.status(404);
    throw new Error('Image not found');
  }

  res.sendFile(imagePath);
});

const updateCard = asyncHandler(async (req, res) => {
  const card = await ProjectCard.findById(req.params.id);

  if (!card) {
    res.status(404);
    throw new Error('Card not found');
  }

  const updatedCard = await ProjectCard.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedCard);
});

const deleteCard = asyncHandler(async (req, res) => {
  const card = await ProjectCard.findById(req.params.id);

  if (!card) {
    res.status(404);
    throw new Error('Card not found');
  }

  await card.remove();
  res.json({ message: 'Card removed' });
});

export { 
  createCard, 
  getAllCards, 
  getProjectImage,
  updateCard, 
  deleteCard 
};