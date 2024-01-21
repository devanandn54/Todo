const Task = require("../models/Tasks");

const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.user.userId;
    console.log(userId);

    const task = new Task({
      userId: userId, // Associate task with the current user
      title,
      description,
      dueDate,
      priority,
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;
    const userId = req.user.userId;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: userId },
      { title, description, dueDate, priority, completed },
      { new: true }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }
    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.userId;

    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      userId: userId,
    });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }
    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const markTaskAsComplete = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { completed } = req.body;
      const userId = req.user.userId;
      console.log(userId)
  
      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId, userId: userId },
        { completed },
        { new: true }
      );
  
      if (!updatedTask) {
        return res
          .status(404)
          .json({ message: "Task not found or not authorized" });
      }
  
      res.json({
        message: "Task marked as complete successfully",
        task: updatedTask,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

module.exports = { getAllTasks, createTask, updateTask, deleteTask, markTaskAsComplete };
