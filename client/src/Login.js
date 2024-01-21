// import React, { useState } from 'react'
// import {Box, Button, TextField, Typography} from '@mui/material'
// import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
// import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';




// const Auth = () => {
//     const [isSignUp, setIsSignUp] = useState(false)
//     const [inputs, setInputs] = useState({
//         userName: "",
//         email: "",
//         password: ""
//     });
//     const [errors, setErrors] = useState({
//         userName: "",
//         email: "",
//         password: ""
//       });
//     const handleChange = (e) => {
//         setInputs((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value
//         }))
//         setErrors((prev) => ({
//             ...prev,
//             [e.target.name]: ""
//         }))

//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
       
//         let formIsValid = true;
//         const newErrors = {};

//         if (isSignUp && !inputs.userName.trim()) {
//             formIsValid = false;
//             newErrors.userName = "Username is required";
//           }

//           if (!inputs.email.trim()) {
//             formIsValid = false;
//             newErrors.email = "Email is required";
//           }
//           if (!inputs.password.trim()) {
//             formIsValid = false;
//             newErrors.password = "Password is required";
//           }

//           setErrors(newErrors);

//           if (formIsValid) {
//             console.log("Form submitted:", inputs);
            
//           }
//     }
//     const resetState = () => {
//         setIsSignUp(!isSignUp)
//         setInputs({userName: "", email: "", password: ""});
//         setErrors({ userName: "", email: "", password: "" });
//     }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <Box
//           display='flex'
//           flexDirection={'column'}
//           maxWidth={400}
//           alignItems='center'
//           justifyContent={'center'}
//           margin='auto'
//           marginTop={5}
//           padding={3}
//           borderRadius={5}
//           boxShadow={'5px 5px 10px #ccc'}
//           sx={{':hover': {boxShadow: '10px 10px 20px #ccc'}}}
//         >
//           <Typography variant='h2' padding={3} textAlign='center'>
//             {isSignUp ? "Signup" : "Login"}
//           </Typography>
//          { isSignUp && <TextField name="userName" onChange={handleChange} value={inputs.userName} margin="normal" type={'text'} variant='outlined' placeholder='Name'/>}
//           <TextField
//             margin='normal'
//             name="email"
//             type={'email'}
//             onChange={handleChange}
//             value={inputs.email}
//             variant='outlined'
//             placeholder='User Name or Email'
            
//           />
//           <TextField name="password" onChange={handleChange} value={inputs.password} margin='normal' type={'password'} variant='outlined' placeholder='Password' />
//           <Button endIcon={isSignUp ? <HowToRegOutlinedIcon/> : <LoginOutlinedIcon/>} type="submit" sx={{marginTop: 3, borderRadius: 3}} variant='contained' color='warning'>
//             {isSignUp ? "Signup" : "Login"}
//           </Button>
//           <Button endIcon={isSignUp ? <LoginOutlinedIcon/> : <HowToRegOutlinedIcon/>} onClick={resetState} sx={{marginTop: 3, borderRadius: 3}} >
//             {isSignUp ? "Login" : "Signup"}
//           </Button>
//         </Box>
//       </form>
//     </div>
//   )
// }

// export default Auth


import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
  // const [isSignUp, setIsSignUp] = useState(false);

  const [inputs, setInputs] = useState({
            email: "",
            password: ""
        });
        const navigate = useNavigate();
        // useEffect(() => {
          
        //   setInputs({
        //     userName: '',
        //     email: '',
        //     password: '',
        //   });
        // }, [isSignUp]);

  const validationSchema = Yup.object().shape({
    // userName: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/,
        'Password must meet criteria'
      )
      .required('Password is required'),
  });

  const onSubmit = async (values) => {
    try {
      const url = 'http://localhost:8080/api/auth/login'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      if(response.ok){
        
        const data = await response.json();
        console.log('Authentication Successful', data)
        const token = data.token;
        localStorage.setItem('token', token);
        navigate('/tasksOverview')
        // onLoginSuccess();
        


      }else {
        const errorData = await response.json();
        console.error('Authentication failed:', errorData);
        
      }

      
      
    } catch (error) {
      console.error('Error during authentication:', error);
      
    }
    console.log('Form submitted:', values);
    
    
  };

  const resetState = () => {
    setInputs({
      email: '',
      password: ''

    }) 
    navigate('/register')
    
  };

  return (
    <div>
      <Formik
        initialValues={inputs}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Box
            display='flex'
            flexDirection={'column'}
            maxWidth={400}
            alignItems='center'
            justifyContent={'center'}
            margin='auto'
            marginTop={5}
            padding={3}
            borderRadius={5}
            boxShadow={'5px 5px 10px #ccc'}
            sx={{ ':hover': { boxShadow: '10px 10px 20px #ccc' } }}
          >
            <Typography variant='h2' padding={3} textAlign='center'>
              Login
            </Typography>
            {/* <Field
            
              name='userName'
              as={TextField}
              margin='normal'
              type='text'
              variant='outlined'
              placeholder='User Name'
              error={<ErrorMessage name='userName' />}
              helperText={<ErrorMessage name='userName' />}
            /> */}
            <Field
            
              name='email'
              as={TextField}
              margin='normal'
              type='email'
              variant='outlined'
              placeholder='Email'
              error={<ErrorMessage name='email' />}
              helperText={<ErrorMessage name='email' />}
            />
            <Field
            
              name='password'
              as={TextField}
              margin='normal'
              type='password'
              variant='outlined'
              placeholder='Password'
              error={<ErrorMessage name='password' />}
              helperText={<ErrorMessage name='password' />}
            />
            <Button
              endIcon={<LoginOutlinedIcon />}
              type='submit'
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant='contained'
              color='warning'
            >
              Login
            </Button>
            <Button
              endIcon={<HowToRegOutlinedIcon />}
              onClick={resetState}
              sx={{ marginTop: 3, borderRadius: 3 }}
            >
              Signup
            </Button>
          </Box>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;

