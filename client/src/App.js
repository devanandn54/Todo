import React, { useState } from 'react';
import './App.css';
import { CssBaseline } from '@mui/material';
import Onboarding from './Onboarding';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import TasksOverview from './tasksOverview'
import TasksList from './List';
import MyTasks from './MyTasks';
import Login from './Login';
import SignUp from './Register';




function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  const handleOnboardingFinish = () => {
    
    setShowOnboarding(false);
    
  };
  
  return (
    
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
        {showOnboarding ? (
        <Route path='/' element={<Onboarding onFinish={handleOnboardingFinish}/>} />
      ) : (
        <>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<SignUp/>} />
          <Route path='/tasksOverview' element={<TasksOverview/>} />
          <Route path='/tasksList' element={<TasksList/>} />
          <Route path='/myTasks' element={<MyTasks/>} />

          

        
        
        </>

      )}

          
    </Routes>
        
        
        
        
        </BrowserRouter>

      
    </>
    
  );
}

export default App;
