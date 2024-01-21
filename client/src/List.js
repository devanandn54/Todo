import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CssBaseline,
  Paper,
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
  Button,
  Divider,
  Grid,
  Pagination,
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem


} from "@mui/material";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";


const TasksList = () => {
  const itemsPerPage = 5; // Adjust as needed
  const [anchorEl, setAnchorEl] = useState(null);
  const [tasksData, setTasksData] = useState([]);
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState([tasksData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('JWT token not found in localStorage');
          return;
        }
        const response = await fetch("http://localhost:8080/api/tasks/tasks", {
          headers: {
            Authorization: token,
          }
        });
        if(response.ok){
          const data = await response.json();
          setTasksData(data);
          setTasks(data);
        }else{
          console.error("Failed to fetch data from the backend");
        }
        
      } catch (error) {
        console.error("Error during data fetching:", error);
      }
    }
    fetchData();
  }, [])
  console.log(tasksData)
  // console.log(tasks)

  const handleSort = (type) => {
    let sortedTasks;
    let tasksCopy = [...tasksData];
    switch (type) {
      case "dueDate":
        sortedTasks = tasksCopy.sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );

        break;
      case "priority":
        sortedTasks = tasksCopy.sort(
          (a, b) =>
            b.priority - a.priority
        );

        break;
      case "createdAt":
        sortedTasks = tasksCopy.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        break;
      case "today":
        const today = new Date();
  sortedTasks = tasksCopy.filter(
    (task) => {
      const taskDueDate = new Date(task.dueDate);
      return (
        taskDueDate.getDate() === today.getDate() &&
        taskDueDate.getMonth() === today.getMonth() &&
        taskDueDate.getFullYear() === today.getFullYear()
      );
    }
  );

        break;
      case "tomorrow":
        const todayOne = new Date();
        const tomorrow = new Date(todayOne);
        tomorrow.setDate(todayOne.getDate() + 1);
      
        sortedTasks = tasksCopy.filter(
          (task) => {
            const taskDueDate = new Date(task.dueDate);
            return (
              taskDueDate.getDate() === tomorrow.getDate() &&
              taskDueDate.getMonth() === tomorrow.getMonth() &&
              taskDueDate.getFullYear() === tomorrow.getFullYear()
            );
          }
        );
        console.log(sortedTasks);

        break;
      default:
        sortedTasks = tasksCopy;
    }
    
    setTasks(sortedTasks);
  };
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
    // Example: Redirect to login page
    // history.push("/login");
  };


  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Box>
       <CssBaseline />
      <AppBar position="static" style={{ backgroundColor: '#2196f3' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo List
            </Typography>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
              <Link to="/tasksOverview" style={{ textDecoration: 'none', color: 'white', marginLeft: '16px' }}>
                <Typography variant="h6">Overview</Typography>
              </Link>
              <Link to="/myTasks" style={{ textDecoration: 'none', color: 'white', marginLeft: '16px' }}>
                <Typography variant="h6">My Tasks</Typography>
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
    <Container component="main" maxWidth="md">
     
      
      <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
      
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Here's your list of Todos
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ButtonGroup
              fullWidth
              sx={{
                marginBottom: 2,
                flexDirection: { xs: "column", sm: "row" }, // Stack buttons on small screens
              }}
            >
              <Button onClick={() => handleSort("dueDate")} variant="outlined"
                color="primary">Due Date</Button>
              <Button onClick={() => handleSort("priority")}variant="outlined"
                color="primary">Priority</Button>
              <Button onClick={() => handleSort("createdAt")}variant="outlined"
                color="primary">
                Creation Date
              </Button>
              <Button onClick={() => handleSort("today")}variant="outlined"
                color="primary">Today's Tasks</Button>
              <Button onClick={() => handleSort("tomorrow")}variant="outlined"
                color="primary">
                Tomorrow's Tasks
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <List>
              {tasks.slice(startIndex, endIndex).map((task) => (
                <React.Fragment key={task.id}>
                  <Grid container>
                    <Grid item xs={12} sm={8}>
                      <ListItem>
                        <ListItemText
                          primary={task.title}
                          secondary={
                            <span style={{color:
                              task.priority === 3
                                ? "red" 
                                : task.priority === 2
                                ? "orange" 
                                : "green", }}>
                            Priority: {task.priority === 3
                                ? "High"
                                : task.priority === 2
                                ? "Medium"
                                : "Low"}
                            </span>}
                          sx={{ wordBreak: "break-word" }}
                        />
                      </ListItem>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <ListItem>
                        <ListItemText
                          primary={new Date(task.dueDate).toLocaleDateString()}
                          secondary="Due Date"
                          sx={{ textAlign: { xs: "left", sm: "right" } }}
                        />
                      </ListItem>
                    </Grid>
                  </Grid>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Pagination
              count={Math.ceil(tasks.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              sx={{ marginTop: 2, textAlign: "center" }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </Box>
  );
};

export default TasksList;
