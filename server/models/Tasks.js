const mongoose = require('mongoose')

const PriorityEnum = Object.freeze({
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
});

const taskSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: Number,
      enum: Object.values(PriorityEnum),
      default: PriorityEnum.LOW,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Task = mongoose.model('Task', taskSchema);
  
  module.exports = Task;