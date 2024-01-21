import React, { useState } from 'react'
import { Button, Container, Paper, Slider, Typography } from '@mui/material';


const slides = [
    {
      title: 'Welcome to Todo App',
      description: 'A simple and efficient way to manage your tasks.',
    },
    {
      title: 'Organize Your Tasks',
      description: 'Keep track of your tasks with categories and due dates.',
    },
    {
      title: 'Get Started',
      description: 'Start using Todo App now. It\'s easy and free!',
    },
  ];

const Onboarding = ({onFinish}) => {
    const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < slides.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Finish onboarding
      onFinish();
    }
  };
    
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          {slides[activeStep].title}
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          {slides[activeStep].description}
        </Typography>
        <Slider value={activeStep} max={slides.length - 1} valueLabelDisplay="off" />
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </Paper>
    </Container>
    
  )
}

export default Onboarding