import React, { useEffect, useState } from 'react'
import { Grid, Typography, Fab } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import TaskItem from './TaskItem';
import AddTask from './addTask';
import EditTask from './editTask';

const MyTasks = () => {
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setEditTaskModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null); 
  

    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('JWT token not found in localStorage');
            return;
          }
  
          const response = await fetch('http://localhost:8080/api/tasks/tasks', {
            headers: {
              Authorization: token,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setTasks(data);
          } else {
            console.error('Failed to fetch tasks from the backend');
          }
        } catch (error) {
          console.error('Error during task fetching:', error);
        }
      };
  
      fetchTasks();
    }, []);
    const handleOpenAddTaskModal = () => {
      setAddTaskModalOpen(true);
      setEditTaskModalOpen(false);
      setTaskToEdit(null);
    };
  
    const handleOpenEditTaskModal = (task) => {
      console.log(task)
      setEditTaskModalOpen(true);
      setAddTaskModalOpen(false);
      setTaskToEdit(task);
    };
    const handleCloseModal = () => {
      setAddTaskModalOpen(false);
      setEditTaskModalOpen(false);
      setTaskToEdit(null);
    };
    
      
      const handleAddTask = async (newTaskData) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('JWT token not found in localStorage');
            return;
          }
    
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
            // Now, you can update the state or perform any other necessary actions
            setTasks((prevTasks) => [...prevTasks, newTaskData]);
            // Close the modal
            handleCloseModal();
          } else {
            // Handle API error
            console.error('Failed to add task:', response.statusText);
          }
        } catch (error) {
          // Handle other errors
          console.error('Error during API call:', error);
        }
      };
      const handleEditTask = async (editedTaskData) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('JWT token not found in localStorage');
            return;
          }
    
          const response = await fetch(
            `http://localhost:8080/api/tasks/editTasks/${taskToEdit._id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
              body: JSON.stringify(editedTaskData),
            }
          );
    
          if (response.ok) {
            console.log('Task edited successfully');
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task._id === taskToEdit._id ? { ...task, ...editedTaskData } : task
              )
            );
            handleCloseModal();
          } else {
            console.error('Failed to edit task:', response.statusText);
          }
        } catch (error) {
          console.error('Error during API call:', error);
        }
      };
      
    
      
    
    
      const handleComplete = async (taskId) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('JWT token not found in localStorage');
            return;
          }
      
          const response = await fetch(`http://localhost:8080/api/tasks/markComplete/${taskId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
      
          if (response.ok) {
            console.log('Task marked as complete successfully');
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task._id === taskId ? { ...task, completed: true } : task
              )
            );
          } else {
            console.error('Failed to mark task as complete:', response.statusText);
          }
        } catch (error) {
          console.error('Error during API call:', error);
        }
      };
    
      
    
      const handleDelete = async (taskId) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('JWT token not found in localStorage');
            return;
          }
      
          const response = await fetch(`http://localhost:8080/api/tasks/deleteTasks/${taskId}`, {
            method: 'DELETE',
            headers: {
              Authorization: token,
            },
          });
      
          if (response.ok) {
            // Task deleted successfully, you can handle the response if needed
            console.log('Task deleted successfully');
            // Now, update the state to remove the deleted task
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
          } else {
            // Handle API error
            console.error('Failed to delete task:', response.statusText);
          }
        } catch (error) {
          // Handle other errors
          console.error('Error during API call:', error);
        }
      };
  return (
    <div style={{ padding: "16px" }}>
    <Typography variant="h4" gutterBottom style={{ marginBottom: "16px" }}>
      My Tasks
    </Typography>
    <Grid container spacing={3}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onComplete={handleComplete}
          onEdit={handleOpenEditTaskModal}
          onDelete={handleDelete}
        />
      ))}
    </Grid>
    <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
        }}
        onClick={handleOpenAddTaskModal}
      >
        <AddIcon />
      </Fab>
    <AddTask
        open={isAddTaskModalOpen}
        onClose={handleCloseModal}
        onAddTask={handleAddTask}
      />
      <EditTask
        open={isEditTaskModalOpen} // Open EditTask when taskToEdit is not null
        onClose={handleCloseModal}
        onEditTask={handleEditTask} // Pass handleAddTask as onEditTask
        taskToEdit={taskToEdit}
      />
  </div>
  )
}

export default MyTasks
