import mongoose from 'mongoose';

const projectCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: { 
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ProjectCard = mongoose.model('ProjectCard', projectCardSchema);

export default ProjectCard;