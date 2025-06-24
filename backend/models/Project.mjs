import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter project title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter project description"],
    },
    image: {
      type: String,
      required: [true, "Please upload project image"],
    },
    year: {
      type: String,
      required: [true, "Please enter project year"],
    },
    materials: {
      type: String,
      required: [true, "Please enter materials used"],
    },
    category: {
      type: String,
      enum: ['industrial', 'commercial', 'residential'],
      default: 'industrial'
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Добавляем виртуальное поле для URL изображения
projectSchema.virtual('imageUrl').get(function() {
  return `/api/project-images/${this.image}`;
});

const Project = mongoose.model('Project', projectSchema);

export default Project;