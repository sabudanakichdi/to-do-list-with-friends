import { Stack, Button, Grid,TextField, Box } from '@mui/material';
import React from 'react';
import config from '../../config.json';
import axios from 'axios';

const backendUrl = config.backendUrl;

function LoginComp() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(email);
console.log(password);
const response = await axios.post(backendUrl+'/auth/login', {
    email: email,
    
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  // If the login is successful, store the user's authentication token in local storage
  if (response.status === 200) {
    const token = await response.json();
    // localStorage.setItem('authToken', token);

    // Redirect the user to the home page
    window.location.href = '/task';
  // } else {
  //   // TODO: Display an error message to the user
  //   alert('Invalid email or password');
  // }   
 };
}

  return (
         
<Grid
  container  my={8} 
  direction="column"
  alignItems="center"
  justifyContent="center"  
  spacing={2} minWidth='50%'
  >       
    <Grid item xs={24} sm={12} >        
        <TextField type="email" label="Email" fullWidth   variant="outlined" color="primary" focused  size='50' alignself= 'center'  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} xs={1} />
        
    </Grid>  
    <Grid item xs={24} sm={12}>
        <TextField type="password" label="Password" fullWidth  variant="outlined" color="primary" focused  alignself= 'center' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> 
    </Grid>
    <Grid item xs={24} sm={12}>
        <Button alignself= 'center' fullWidth  variant="contained" type="submit" onClick={handleSubmit}>Sign In</Button>
    </Grid>
    <Grid item xs={24} sm={12}>
        <Stack direction='row'>
            <Button variant="text" onClick={()=>{window.location.href = '/register'}}>Register</Button>
            <Button variant="text" onClick={()=>{window.location.href = '/forgot'}}>Forgot Password?</Button>
        </Stack>
    </Grid>
        </Grid>                    
  );
}

 export default LoginComp;