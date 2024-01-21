import React from 'react'
import {
    Card,
    CardContent,
    Typography,
    Button,
    IconButton,
    Grid,
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskItem = ({ task, onDelete, onEdit, onComplete }) => {
    const handleComplete = () => {
        onComplete(task._id);
      };
    
      const handleEdit = () => {
        onEdit(task);
      };
    
      const handleDelete = () => {
        onDelete(task._id);
      };
    
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card style={{ margin: "16px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ marginBottom: "8px" }}>
            {task.description}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Priority: {task.priority}
          </Typography>
          <div style={{ marginTop: "16px" }}>
          {task.completed ? (
              <Button variant="contained" color="primary" disabled>
                Completed
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleComplete}
                style={{ marginRight: "8px" }}
              >
                Complete
              </Button>
            )}
            <IconButton color="primary" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default TaskItem
