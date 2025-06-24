import Project from "../models/Project.mjs";
import asyncHandler from 'express-async-handler';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Получить все проекты
const getProjects = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const query = category ? { category } : {};
  
  try {
    const projects = await Project.find(query).sort({ order: 1 });
    res.json(projects || []); // Всегда возвращаем массив
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json([]); // При ошибке тоже возвращаем пустой массив
  }
});

// Создать новый проект
const createProject = asyncHandler(async (req, res) => {
  const { title, description, year, materials, category } = req.body;
  
  if (!title || !description || !year || !materials || !req.file) {
    res.status(400);
    throw new Error('Please fill all fields and upload an image');
  }

  const project = await Project.create({
    title,
    description,
    image: req.file.filename,
    year,
    materials,
    category
  });

  res.status(201).json(project);
});

// Обновить проект
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Обновляем поля
  project.title = req.body.title || project.title;
  project.description = req.body.description || project.description;
  project.year = req.body.year || project.year;
  project.materials = req.body.materials || project.materials;
  project.category = req.body.category || project.category;
  project.order = req.body.order !== undefined ? req.body.order : project.order;

  // Если загружено новое изображение
  if (req.file) {
    // Удаляем старое изображение
    const oldImagePath = path.join(__dirname, '..', 'uploads', 'project-images', project.image);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
    project.image = req.file.filename;
  }

  const updatedProject = await project.save();
  res.json(updatedProject);
});

// Удалить проект
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Удаляем изображение
  const imagePath = path.join(__dirname, '..', 'uploads', 'project-images', project.image);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  // Используем deleteOne() вместо remove()
  await Project.deleteOne({ _id: project._id });
  res.json({ message: 'Project removed' });
});

// Обновить порядок проектов
const updateProjectsOrder = asyncHandler(async (req, res) => {
  const { projects } = req.body;
  
  if (!Array.isArray(projects)) {
    res.status(400);
    throw new Error('Invalid projects data');
  }

  const bulkOps = projects.map(project => ({
    updateOne: {
      filter: { _id: project._id },
      update: { $set: { order: project.order } }
    }
  }));

  await Project.bulkWrite(bulkOps);
  res.json({ message: 'Projects order updated' });
});

export { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  updateProjectsOrder
};