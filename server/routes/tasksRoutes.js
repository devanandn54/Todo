const express = require('express');
const { auth } = require('../middlewares/auth');
const { getAllTasks, createTask, updateTask, deleteTask, markTaskAsComplete } = require('../controllers/taskController');
const router = express.Router();


router.get('/tasks', auth, getAllTasks);
router.post('/createTasks', auth, createTask);
router.put('/editTasks/:taskId', auth, updateTask);
router.patch('/markComplete/:taskId', markTaskAsComplete);
router.delete('/deleteTasks/:taskId', auth, deleteTask);

module.exports = router;