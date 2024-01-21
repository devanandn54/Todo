import React, { useState } from 'react'
import {
  Typography,
  Modal,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  } from "@mui/material";
  import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css';
  // import { DatePicker } from '@mui/x-date-pickers';

const AddTask = ({ open, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('');
  const handleAddTask = async () => {
    // Validate the input fields before adding the task
    if (title.length >= 2 && description.length >= 2 && dueDate >= new Date()) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('JWT token not found in localStorage');
          return;
        }
        const priorityValue = priority === 'High' ? 3 : priority === 'Medium' ? 2 : 1;
        const newTaskData = {
          title,
          description,
          dueDate,
          priority: priorityValue,
        };

        const response = await fetch('http://localhost:8080/api/tasks/createTasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(newTaskData),
        });

        if (response.ok) {
          // Task added successfully, you can handle the response if needed
          console.log('Task added successfully');
          // Notify the parent component (MyTasks) about the new task
          onAddTask(newTaskData);
          // Clear the input fields after adding the task
          setTitle('');
          setDescription('');
          setDueDate(null);
          setPriority('');
        } else {
          // Handle API error
          console.error('Failed to add task:', response.statusText);
        }
      } catch (error) {
        // Handle other errors
        console.error('Error during API call:', error);
      }
    } else {
      // Handle validation error
      alert('Please fill in all the required fields correctly.');
    }
  };
    
  return (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="add-task-modal"
        aria-describedby="add-task-form"
      >
        <Paper
          elevation={3}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "16px",
            width: "300px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Task
          </Typography>
          <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Task Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          className="form-control"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            fullWidth
          >
            Add Task
          </Button>
        </Paper>
      </Modal>
  )
}

export default AddTask
