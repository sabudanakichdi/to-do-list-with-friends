import { Stack, Button, Grid,TextField, Box } from '@mui/material';
import React from 'react';
import logo from '../../assets/logo.png'
import config from '../../config.json';

const backendUrl = config.backendUrl;

function ForgotpwdComp() {
  const [email, setEmail] = React.useState('');
  const [username, setusername] = React.useState('');
  const [verificationCode, setverificationCode] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the verification code
    if (verificationCode === '') {
      alert('Please enter the verification code.');
      return;
    }
    console.log(backendUrl+'/auth/forgot');
    const response = await fetch(backendUrl+'/auth/forgot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username }),
    });
  
    // Make a request to the backend API to reset the user's password using the verification code
    // TODO: Implement this function

    // Reset password successfully
    alert('Your password has been reset successfully!');
    // Register the user with the backend API or local storage here
  };

  return (        
<Grid
  container  my={8} 
  direction="column"
  alignItems="center"
  justifyContent="center"  
  spacing={2} minWidth='50%'
  >         
    <Grid item xs={12} sm={12} >        
        <TextField type="username" label="username" fullWidth   variant="outlined" color="primary" focused  size='50' alignself= 'center'  placeholder="username" value={username} onChange={(e) => setusername(e.target.value)} xs={1} />        
    </Grid>    
    <Grid item xs={12} sm={12} >        
        <TextField type="email" label="Email" fullWidth   variant="outlined" color="primary" focused  size='50' alignself= 'center'  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} xs={1} />        
    </Grid>  
    <Grid item xs={12} sm={12} >        
        <Button alignself= 'center' fullWidth variant="contained" type="submit" onClick={handleSubmit}>Send Verification code</Button>
    </Grid>  
        </Grid>                          
  );
}

export default ForgotpwdComp;