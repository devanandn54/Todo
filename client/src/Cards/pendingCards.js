import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PendingCards = ({ tasks }) => {
  const { dueTasks } = tasks
  return (
    <Card sx={{
        transition: 'transform 0.3s', // Add smooth transition on hover
        '&:hover': {
          transform: 'scale(1.05)', // Increase size on hover
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', // Add a subtle shadow on hover
        },
      }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Pending Tasks
        </Typography>
        <Typography variant="h4" component="div">
          {dueTasks}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PendingCards