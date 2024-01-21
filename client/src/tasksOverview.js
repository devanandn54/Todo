import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PieChartComponent from './PieChartComponent';
import CompletedCards from './Cards/completedCards';
import PendingCards from './Cards/pendingCards';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';



const TasksOverview = () => {

  const [tasksData, setTasksData] = useState({
    completedTasks: 0,
    dueTasks: 0,
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
    // Example: Redirect to login page
    // history.push('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
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
          let data = [];
          data = await response.json();

          const completedTasks = data.filter((task) => task.completed).length;
          const dueTasks = data.length - completedTasks;

          setTasksData({
            completedTasks,
            dueTasks,
          });
        } else {
          console.error('Failed to fetch data from the backend');
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <AppBar position="static" style={{ backgroundColor: '#2196f3' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Tasks Overview
          </Typography>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
              <Link to="/myTasks" style={{ textDecoration: 'none', color: 'white', marginLeft: '16px' }}>
                <Typography variant="h6">My Tasks</Typography>
              </Link>
              <Link to="/tasksList" style={{ textDecoration: 'none', color: 'white', marginLeft: '16px' }}>
                <Typography variant="h6">Todo List</Typography>
              </Link>
            </Box>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar alt="User Photo" src="/path/to/user-photo.jpg" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>
                <ExitToAppIcon fontSize="small" style={{ marginRight: '8px' }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '16px' }}>
          
            <PieChartComponent tasks={tasksData}/>
            <div style={{ marginBottom: '20px', width: '100%' }}></div>
          
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <CompletedCards tasks={tasksData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <PendingCards tasks={tasksData} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default TasksOverview;






